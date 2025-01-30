function createCalendarEvents() {
  try {
    Logger.log('Function started'); // Log the start of the function

    // Get the active sheet and calendar
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var calendarId = "[Google Calendar ID]"; // Your Calendar ID
    var calendar = CalendarApp.getCalendarById(calendarId); // Get the calendar by ID
    Logger.log('Active sheet and calendar retrieved');

    // Define the range of data
    var startRow = 2; // Row to start reading data from (skip header row)
    var numRows = sheet.getLastRow() - 1; // Number of rows with data (excluding header)
    var dataRange = sheet.getRange(startRow, 1, numRows, 4); // Get range of data (columns A-D)
    var data = dataRange.getValues(); // Retrieve the data as a 2D array
    Logger.log('Data range defined and retrieved');

    // Fetch all existing events in the calendar
    var allEvents = calendar.getEvents(new Date(0), new Date(9999, 11, 31)); // Set an end date far in the future to cover all events
    var eventsMap = {};
    Logger.log('Existing events fetched');

    // Map existing events by title and start time
    for (var i = 0; i < allEvents.length; i++) {
      var event = allEvents[i];
      var eventKey = event.getTitle() + event.getStartTime().toString();
      eventsMap[eventKey] = event;
    }

    // Process data in batches
    for (var i = 0; i < data.length; i++) {
      var row = data[i]; // Get the current row data
      var startDate = new Date(row[0]); // Convert start date from string to Date object
      var endDate = new Date(row[1]); // Convert end date from string to Date object
      var title = row[2]; // Get the event title
      var description = getRichTextDescription(sheet, startRow + i, 4); // Get the event description with hyperlinks (D column)
      var eventKey = title + startDate.toString();

      if (eventsMap[eventKey]) {
        // Update existing event if needed
        var event = eventsMap[eventKey];
        if (event.getEndTime().getTime() !== endDate.getTime() || event.getDescription() !== description) {
          event.setTitle(title);
          event.setDescription(description); // Ensure this line is correct
          event.setTime(startDate, endDate);
          event.removeAllReminders();
          event.addPopupReminder(60); // Popup 60 minutes before the event
          event.addPopupReminder(5);  // Popup 5 minutes before the event
          event.addEmailReminder(720); // Email 12 hours before the event
        }
        delete eventsMap[eventKey]; // Remove from map as it is already processed
      } else {
        // Create a new event
        var newEvent = calendar.createEvent(title, startDate, endDate, {
          description: description // Ensure this is correctly set
        });
        newEvent.addPopupReminder(60); // Popup 60 minutes before the event
        newEvent.addPopupReminder(5);  // Popup 5 minutes before the event
        newEvent.addEmailReminder(720); // Email 12 hours before the event
      }
    }

    Logger.log('Batch processed: Rows ' + startRow + ' to ' + (startRow + data.length - 1));

    // Delete events not in the updated data
    for (var eventKey in eventsMap) {
      if (eventsMap.hasOwnProperty(eventKey)) {
        eventsMap[eventKey].deleteEvent();
      }
    }

    Logger.log('Function completed'); // Log the completion of the function
  } catch (e) {
    Logger.log('Error: ' + e.message); // Log any errors that occur
  }
}

// Helper function to extract rich text description from a cell, including hyperlinks
function getRichTextDescription(sheet, row, col) {
  var cell = sheet.getRange(row, col);
  var richTextValue = cell.getRichTextValue();
  var value = cell.getValue();

  if (richTextValue != null) {
    var runs = richTextValue.getRuns();
    var description = "";

    for (var i = 0; i < runs.length; i++) {
      var runText = runs[i].getText();
      var linkUrl = runs[i].getLinkUrl();

      if (linkUrl) {
        // Append the hyperlink
        description += '<a href="' + linkUrl + '">' + runText + '</a>';
      } else {
        // Append the plain text
        description += runText;
      }
    }

    return description;
  }

  // Return the cell value if no rich text found
  return value;
}
