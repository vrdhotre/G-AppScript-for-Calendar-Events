# Integrate Google Calendar Events with Google Sheets Using Apps Script

## Introduction

This guide will walk you through the process of creating and integrating Google Calendar events directly from a Google Spreadsheet using Google Apps Script. Even if you're new to this, don't worry—this guide is designed for beginners with little to no programming experience.

## Prerequisites

- **Google Account**: You'll need to be signed into your Google account.
- **Google Calendar Access**: Ensure you have access to the Google Calendar where you want to add events.

## Step-by-Step Guide

### 1. Create a New Google Spreadsheet

- Go to [Google Sheets](https://sheets.google.com) and click on **Blank** to create a new spreadsheet.

### 2. Set Up Your Spreadsheet

- **Rename the Spreadsheet**: Click on the default title `Untitled spreadsheet` at the top-left corner and name it something like `Calendar Events Creator`.
- **Create Headers**: In the first row of the spreadsheet, enter the following headers:
  - Cell A1: `Title`
  - Cell B1: `Description`
  - Cell C1: `Location`
  - Cell D1: `Start Date & Time`
  - Cell E1: `End Date & Time`

### 3. Open the Apps Script Editor

- In your spreadsheet, click on the **Extensions** tab in the menu bar.
- Select **Apps Script** from the dropdown. This will open a new tab with the Apps Script editor.

### 4. Write the Apps Script Code

- **Delete Placeholder Code**: If there's any default code in the editor (`function myFunction() {}`), you can remove it.
- **Copy and Paste the Following Code**:

  ```javascript
  function createCalendarEvents() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var startRow = 2; // First row of data to process
    var numRows = sheet.getLastRow() - 1; // Number of rows to process
    var dataRange = sheet.getRange(startRow, 1, numRows, 5);
    var data = dataRange.getValues();

    for (var i = 0; i < data.length; ++i) {
      var row = data[i];
      var title = row[0];
      var description = row[1];
      var location = row[2];
      var startTime = new Date(row[3]);
      var endTime = new Date(row[4]);

      var event = {
        'summary': title,
        'description': description,
        'location': location,
        'start': {
          'dateTime': startTime.toISOString()
        },
        'end': {
          'dateTime': endTime.toISOString()
        }
      };

      CalendarApp.getDefaultCalendar().createEvent(title, startTime, endTime, {description: description, location: location});
    }
    SpreadsheetApp.getUi().alert('Events have been added to your calendar!');
  }
  ```

### 5. Save Your Script

- Click on the floppy disk icon 💾 or press **Ctrl+S** (Windows) or **Cmd+S** (Mac) to save your script.
- Name your project by clicking on `Untitled project` at the top-left and entering a name like `CalendarEventScript`.

### 6. Enable Required APIs

- **Permissions**: The first time you run the script, you'll need to grant it permission to access your calendar.
- **Enable Calendar API**:
  - In the Apps Script editor, click on the **Services** icon (it looks like a "+" symbol in a shield).
  - In the dialog, find and select **Calendar API**.
  - Click **Add**.

### 7. Run the Script

- Click on the drop-down menu beside the run button (triangle icon) and ensure `createCalendarEvents` is selected.
- Click the **Run** button.
- **Authorize the Script**:
  - A dialog will appear requesting authorization.
  - Click **Review Permissions**.
  - Choose your Google account.
  - You might see a warning saying "This app isn't verified".
  - Click on **Advanced** and then **Go to CalendarEventScript (unsafe)**.
  - Click **Allow** to grant the necessary permissions.

### 8. Enter Your Event Details

- Go back to your Google Spreadsheet.
- Starting from row 2, enter the event details under the respective headers.
  - **Title**: Name of the event.
  - **Description**: Details about the event.
  - **Location**: Where the event will take place.
  - **Start Date & Time**: When the event starts. *(Format: MM/DD/YYYY HH:MM:SS)*
  - **End Date & Time**: When the event ends. *(Format: MM/DD/YYYY HH:MM:SS)*

  **Example**:

  | Title          | Description        | Location      | Start Date & Time   | End Date & Time     |
  |----------------|--------------------|---------------|---------------------|---------------------|
  | Team Meeting   | Discuss Q4 targets | Conference Rm | 11/15/2023 10:00:00 | 11/15/2023 11:00:00 |

### 9. Run the Script Again

- After entering your event details, run the script again by clicking the **Run** button in the Apps Script editor.
- A message should appear saying "Events have been added to your calendar!"

### 10. Verify Events in Google Calendar

- Go to your [Google Calendar](https://calendar.google.com).
- Check the dates and times of the events you added to see if they appear correctly.

## Troubleshooting

- **Script Errors**: If you encounter errors when running the script, ensure that:
  - All date and time entries are in the correct format.
  - You have granted all necessary permissions.
- **Events Not Appearing**: Double-check that you're looking at the correct calendar associated with your Google account.

## Conclusion

Congratulations! You've successfully created a Google Apps Script that adds events from a Google Sheet to your Google Calendar. This tool can save you time, especially when dealing with multiple events.

### What's Next?

- **Customize the Script**: Modify the script to add more functionalities, like sending email reminders.
- **Share with Others**: This tool can be shared with colleagues who might benefit from it.
- **Explore Apps Script**: Delve deeper into Google Apps Script to automate other tasks in Google Workspace.

## Additional Resources

- **Apps Script Documentation**: [Google Apps Script Overview](https://developers.google.com/apps-script)
- **Google Calendar API**: [Calendar Service](https://developers.google.com/apps-script/reference/calendar/)

## Questions?

If you have any questions or need further assistance, feel free to reach out or explore the resources above to enhance your understanding.

---

# G-AppScript-for-Calendar-Events
Integrate Google Sheets with Google Calendar for Mapping Events such as Classes timings.

## Overview

**G-AppScript-for-Calendar-Events** is a powerful Google Apps Script designed to enhance your Google Calendar experience. By automating event management and providing advanced customization options, this script streamlines your scheduling process and boosts productivity.

## Features

- **Automated Event Creation**: Generate calendar events programmatically based on specific triggers or criteria.
- **Bulk Event Management**: Update or delete multiple events simultaneously.
- **Custom Notifications**: Set up personalized email reminders or SMS notifications for upcoming events.
- **Integration Capabilities**: Seamlessly connect with other Google Workspace apps (like Sheets or Forms) to create dynamic event workflows.
- **Conflict Detection**: Automatically check for scheduling conflicts and suggest alternative times.

## Getting Started

### Prerequisites

- A Google Account with access to Google Calendar.
- Basic understanding of Google Apps Script.
- Sufficient permissions to access and modify calendar events.

### Installation

1. **Clone the Repository**:
   - Download the ZIP file or clone the repo using:
     ```
     git clone https://github.com/vrdhotre/G-AppScript-for-Calendar-Events.git
     ```

2. **Open Google Apps Script Editor**:
   - Go to [script.google.com](https://script.google.com/) and create a new project.

3. **Import the Script**:
   - Copy the code from the downloaded files and paste it into the new Apps Script project.

4. **Set Up Authorization**:
   - Upon first run, authorize the script to access your Google Calendar.

### Configuration

- **Custom Variables**: Edit the script to set up any custom variables or configurations, such as default calendar IDs or notification settings.
- **Triggers**: Set up time-driven or event-driven triggers in the Apps Script dashboard to automate script execution.

## Usage

### Function Examples

- **Create an Event**:
  ```javascript
  function createEvent(title, description, location, startTime, endTime) {
    var calendar = CalendarApp.getDefaultCalendar();
    calendar.createEvent(title, startTime, endTime, {
      description: description,
      location: location,
    });
  }
  ```
  *Usage*: Automate the creation of events with specific details.

- **Bulk Update Events**:
  ```javascript
  function updateEvents() {
    var events = CalendarApp.getDefaultCalendar().getEventsForDay(new Date());
    events.forEach(function(event) {
      event.setLocation('Virtual Meeting Room');
    });
  }
  ```
  *Usage*: Update all events on a given day to change their location or other details.

- **Send Custom Reminders**:
  ```javascript
  function sendReminders() {
    var events = CalendarApp.getDefaultCalendar().getEventsForDay(new Date());
    events.forEach(function(event) {
      var attendees = event.getGuestList();
      // Send custom email to attendees
    });
  }
  ```
  *Usage*: Send tailored reminders or follow-ups to event participants.

### Advanced Integration

- **Linking with Google Sheets**:
  - Read event data from a Google Sheet to create multiple events.
  - Write event summaries back to a sheet for reporting purposes.

- **Form-Driven Event Creation**:
  - Use Google Forms to collect event data and trigger the script to create events based on form submissions.

## Contributing

Contributions are welcome and greatly appreciated! Here's how you can help:

1. **Fork the Project**: Click the "Fork" button at the top right of the repository page.

2. **Create Your Feature Branch**:
   ```
   git checkout -b feature/AmazingFeature
   ```

3. **Commit Your Changes**:
   ```
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**:
   ```
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**: Submit your changes for review.

## License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Google Developers**: For their comprehensive [Google Apps Script documentation](https://developers.google.com/apps-script).
- **Community Contributors**: Thanks to everyone who has provided feedback and enhancements.

## Contact

- **Project Maintainer**: [Vaibhav Dhotre](mailto:vrdhotre@live.com)
- **Issues**: Feel free to open an issue on the repository with the [issue tracker](https://github.com/vrdhotre/G-AppScript-for-Calendar-Events/issues).

---

### Additional Tips

- **Add Badges**: Include status badges at the top of your README for build status, license, or version. For example:
  ```
  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ```

- **Screenshots/GIFs**: Visuals can significantly enhance understanding. Consider adding screenshots of settings or GIFs demonstrating the script in action.

- **Detailed Documentation**: Link to a `docs` folder or a wiki if you have extensive documentation.

- **FAQs**: Address common questions or issues that users might encounter.

### Moving Forward

Have you thought about publishing your script as an add-on in the G Suite Marketplace? It could increase your user base and receive feedback from a broader audience.

Also, engaging with communities like [Stack Overflow](https://stackoverflow.com/questions/tagged/google-apps-script) or the [Google Apps Script forum](https://developers.google.com/apps-script/community) can provide valuable insights and help you refine your project further.
