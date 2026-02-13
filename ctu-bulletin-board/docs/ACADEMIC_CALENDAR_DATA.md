# CTU Academic Calendar 2025-2026
## Data Structure for Firebase Integration

This file contains the academic calendar events and exam dates from the CTU University Calendar for AY 2025-2026.

## Firebase Collection: `academic_calendar`

### Document Structure:
```javascript
{
  title: string,
  category: string, // "semester_start", "semester_end", "exam", "holiday", "enrollment", "event"
  eventDate: Timestamp,
  endDate: Timestamp (optional),
  semester: string, // "first", "second", "summer"
  year: string, // "1st_year", "2nd_year", etc.
  description: string
}
```

---

## First Semester Events

### August 2025
```javascript
{
  title: "First Day of Actual Service",
  category: "semester_start",
  eventDate: new Date("2025-08-04"),
  semester: "first",
  description: "Classes begin for First Semester AY 2025-2026"
}

{
  title: "Classes Start",
  category: "semester_start",
  eventDate: new Date("2025-08-11"),
  semester: "first",
  description: "Regular class sessions commence"
}

{
  title: "Cebu Provincial Charter Day",
  category: "holiday",
  eventDate: new Date("2025-08-06"),
  description: "Provincial holiday - No classes"
}

{
  title: "Cebu Aquino Day",
  category: "holiday",
  eventDate: new Date("2025-08-21"),
  description: "City holiday - No classes"
}

{
  title: "National Heroes Day",
  category: "holiday",
  eventDate: new Date("2025-08-25"),
  description: "National holiday - No classes"
}
```

### September 2025
```javascript
{
  title: "Osmena Day",
  category: "holiday",
  eventDate: new Date("2025-09-09"),
  description: "City holiday - No classes"
}
```

### November 2025
```javascript
{
  title: "All Saints' Day",
  category: "holiday",
  eventDate: new Date("2025-11-01"),
  description: "National holiday - No classes"
}

{
  title: "CTU Founding Anniversary",
  category: "event",
  eventDate: new Date("2025-11-10"),
  description: "University celebration"
}

{
  title: "Bonifacio Day",
  category: "holiday",
  eventDate: new Date("2025-11-30"),
  description: "National holiday - No classes"
}

{
  title: "Changing/Adding/Withdrawing",
  category: "enrollment",
  eventDate: new Date("2025-08-11"),
  endDate: new Date("2025-08-22"),
  semester: "first",
  description: "Period for changing/adding/withdrawing courses"
}

{
  title: "Late Enrollees",
  category: "enrollment",
  eventDate: new Date("2025-07-28"),
  endDate: new Date("2025-08-01"),
  semester: "first",
  description: "Late enrollment period for First Semester"
}
```

### December 2025
```javascript
{
  title: "Feast of the Immaculate Conception",
  category: "holiday",
  eventDate: new Date("2025-12-08"),
  description: "Religious holiday - No classes"
}

{
  title: "Christmas Eve",
  category: "holiday",
  eventDate: new Date("2025-12-24"),
  description: "Holiday - No classes"
}

{
  title: "Christmas Day",
  category: "holiday",
  eventDate: new Date("2025-12-25"),
  description: "National holiday - No classes"
}

{
  title: "Rizal Day",
  category: "holiday",
  eventDate: new Date("2025-12-30"),
  description: "National holiday - No classes"
}

{
  title: "Classes End (First Semester)",
  category: "semester_end",
  eventDate: new Date("2025-12-11"),
  semester: "first",
  description: "Last day of classes for First Semester"
}

{
  title: "Christmas Break Start",
  category: "holiday",
  eventDate: new Date("2025-12-15"),
  endDate: new Date("2026-01-04"),
  description: "Christmas and New Year break"
}
```

---

## Second Semester Events

### January 2026
```javascript
{
  title: "Classes Start (Second Semester)",
  category: "semester_start",
  eventDate: new Date("2026-01-12"),
  semester: "second",
  description: "Classes begin for Second Semester"
}

{
  title: "New Year's Eve",
  category: "holiday",
  eventDate: new Date("2025-12-31"),
  description: "Holiday - No classes"
}

{
  title: "Sto. Niño Fiesta (Sinulog)",
  category: "holiday",
  eventDate: new Date("2026-01-18"),
  description: "Cebu City celebration - No classes"
}

{
  title: "CNE Day Campus Rest Day",
  category: "event",
  eventDate: new Date("2026-01-19"),
  description: "Campus rest day"
}

{
  title: "Changing/Adding/Withdrawing",
  category: "enrollment",
  eventDate: new Date("2026-01-12"),
  endDate: new Date("2026-01-16"),
  semester: "second",
  description: "Period for changing/adding/withdrawing courses"
}

{
  title: "Late Enrollees",
  category: "enrollment",
  eventDate: new Date("2026-01-12"),
  endDate: new Date("2026-01-16"),
  semester: "second",
  description: "Late enrollment period for Second Semester"
}
```

### February 2026
```javascript
{
  title: "Cebu City Charter Day",
  category: "holiday",
  eventDate: new Date("2026-02-24"),
  description: "City holiday - No classes"
}
```

### April 2026
```javascript
{
  title: "Good Friday",
  category: "holiday",
  eventDate: new Date("2026-04-03"),
  description: "Religious holiday - No classes"
}

{
  title: "Holy Saturday",
  category: "holiday",
  eventDate: new Date("2026-04-04"),
  description: "Religious holiday - No classes"
}

{
  title: "Easter Sunday",
  category: "holiday",
  eventDate: new Date("2026-04-05"),
  description: "Religious holiday - No classes"
}

{
  title: "Araw ng Kagitingan",
  category: "holiday",
  eventDate: new Date("2026-04-09"),
  description: "National holiday - No classes"
}

{
  title: "Maundy Thursday",
  category: "holiday",
  eventDate: new Date("2026-04-02"),
  description: "Religious holiday - No classes"
}
```

### May 2026
```javascript
{
  title: "Labor Day",
  category: "holiday",
  eventDate: new Date("2026-05-01"),
  description: "National holiday - No classes"
}

{
  title: "Last Day of Service (Second Semester)",
  category: "semester_end",
  eventDate: new Date("2026-05-22"),
  semester: "second",
  description: "Final day of service for Second Semester"
}

{
  title: "Teachers Leave Duration",
  category: "event",
  eventDate: new Date("2025-05-25"),
  endDate: new Date("2025-07-31"),
  description: "Summer vacation for faculty"
}

{
  title: "Summer Vacation",
  category: "holiday",
  eventDate: new Date("2026-05-25"),
  endDate: new Date("2026-07-31"),
  description: "Summer break for students"
}
```

---

## Examination Schedule

### First Semester Exams

```javascript
// 1st Year (1st Batch)
{
  title: "Prelim Exam - 1st Year (1st Batch)",
  category: "exam",
  eventDate: new Date("2025-09-15"),
  endDate: new Date("2025-09-21"),
  semester: "first",
  year: "1st_year_1st_batch",
  description: "Preliminary examination period"
}

{
  title: "Midterm Exam - 1st Year (1st Batch)",
  category: "exam",
  eventDate: new Date("2025-10-20"),
  endDate: new Date("2025-10-26"),
  semester: "first",
  year: "1st_year_1st_batch",
  description: "Midterm examination period"
}

{
  title: "Semi-Final Exam - 1st Year (1st Batch)",
  category: "exam",
  eventDate: new Date("2025-11-23"),
  endDate: new Date("2025-11-29"),
  semester: "first",
  year: "1st_year_1st_batch",
  description: "Semi-final examination period"
}

{
  title: "Final Exam - 1st Year (1st Batch)",
  category: "exam",
  eventDate: new Date("2025-12-01"),
  endDate: new Date("2025-12-07"),
  semester: "first",
  year: "1st_year_1st_batch",
  description: "Final examination period"
}

// 1st Year (2nd Batch)
{
  title: "Prelim Exam - 1st Year (2nd Batch)",
  category: "exam",
  eventDate: new Date("2025-07-21"),
  endDate: new Date("2025-08-01"),
  semester: "first",
  year: "1st_year_2nd_batch",
  description: "Preliminary examination period"
}

// 2nd Year
{
  title: "Prelim Exam - 2nd Year",
  category: "exam",
  eventDate: new Date("2025-06-02"),
  endDate: new Date("2025-06-13"),
  semester: "first",
  year: "2nd_year",
  description: "Preliminary examination period"
}

// 3rd Year
{
  title: "Prelim Exam - 3rd Year",
  category: "exam",
  eventDate: new Date("2025-06-16"),
  endDate: new Date("2025-06-27"),
  semester: "first",
  year: "3rd_year",
  description: "Preliminary examination period"
}

// 4th Year
{
  title: "Prelim Exam - 4th Year",
  category: "exam",
  eventDate: new Date("2025-06-30"),
  endDate: new Date("2025-07-11"),
  semester: "first",
  year: "4th_year",
  description: "Preliminary examination period"
}

// 5th-6th Year
{
  title: "Prelim Exam - 5th-6th Year",
  category: "exam",
  eventDate: new Date("2025-07-14"),
  endDate: new Date("2025-07-25"),
  semester: "first",
  year: "5th_6th_year",
  description: "Preliminary examination period"
}
```

### Second Semester Exams

```javascript
// 1st Year (1st Batch)
{
  title: "Prelim Exam - 1st Year (1st Batch)",
  category: "exam",
  eventDate: new Date("2026-02-16"),
  endDate: new Date("2026-02-22"),
  semester: "second",
  year: "1st_year_1st_batch",
  description: "Preliminary examination period"
}

{
  title: "Midterm Exam - 1st Year (1st Batch)",
  category: "exam",
  eventDate: new Date("2026-03-23"),
  endDate: new Date("2026-03-29"),
  semester: "second",
  year: "1st_year_1st_batch",
  description: "Midterm examination period"
}

{
  title: "Semi-Final Exam - 1st Year (1st Batch)",
  category: "exam",
  eventDate: new Date("2026-04-27"),
  endDate: new Date("2026-05-03"),
  semester: "second",
  year: "1st_year_1st_batch",
  description: "Semi-final examination period"
}

{
  title: "Final Exam - 1st Year (1st Batch)",
  category: "exam",
  eventDate: new Date("2026-05-04"),
  endDate: new Date("2026-05-09"),
  semester: "second",
  year: "1st_year_1st_batch",
  description: "Final examination period"
}

// Similar structure for other years...
{
  title: "Prelim Exam - 1st Year (2nd Batch)",
  category: "exam",
  eventDate: new Date("2026-01-05"),
  endDate: new Date("2026-01-09"),
  semester: "second",
  year: "1st_year_2nd_batch",
  description: "Preliminary examination period"
}
```

---

## No. of Recitation Days

### First Semester
```javascript
{
  title: "Recitation Days - August",
  category: "info",
  days: 16,
  month: "August",
  semester: "first"
}

{
  title: "Recitation Days - September",
  category: "info",
  days: 25,
  month: "September",
  semester: "first"
}

{
  title: "Recitation Days - October",
  category: "info",
  days: 27,
  month: "October",
  semester: "first"
}

{
  title: "Recitation Days - November",
  category: "info",
  days: 23,
  month: "November",
  semester: "first"
}

{
  title: "Recitation Days - December",
  category: "info",
  days: 9,
  month: "December",
  semester: "first"
}

{
  title: "Total Recitation Days - First Semester",
  category: "info",
  days: 100,
  weeks: 18,
  semester: "first"
}
```

### Second Semester
```javascript
{
  title: "Recitation Days - January",
  category: "info",
  days: 17,
  month: "January",
  semester: "second"
}

{
  title: "Recitation Days - February",
  category: "info",
  days: 23,
  month: "February",
  semester: "second"
}

{
  title: "Recitation Days - March",
  category: "info",
  days: 26,
  month: "March",
  semester: "second"
}

{
  title: "Recitation Days - April",
  category: "info",
  days: 22,
  month: "April",
  semester: "second"
}

{
  title: "Recitation Days - May",
  category: "info",
  days: 12,
  month: "May",
  semester: "second"
}

{
  title: "Total Recitation Days - Second Semester",
  category: "info",
  days: 100,
  weeks: 18,
  semester: "second"
}
```

---

## Intramural Sports Schedule

```javascript
{
  title: "Intramural Week - Intramural Sports Schedule",
  category: "event",
  eventDate: new Date("2025-11-03"),
  endDate: new Date("2025-11-14"),
  description: "Annual intramural sports competitions"
}

{
  title: "Lantern Meet",
  category: "event",
  eventDate: new Date("2025-11-14"),
  description: "Lantern-making competition and display"
}

{
  title: "TryMeet",
  category: "event",
  eventDate: new Date("2025-11-07"),
  description: "Sports tryouts event"
}

{
  title: "Independence Day",
  category: "holiday",
  eventDate: new Date("2025-06-12"),
  description: "National Independence Day celebration"
}
```

---

## Semestral Breaks

```javascript
{
  title: "First Semester Break",
  category: "holiday",
  eventDate: new Date("2025-12-12"),
  endDate: new Date("2026-01-04"),
  description: "Break between First and Second Semester"
}

{
  title: "Summer Vacation",
  category: "holiday",
  eventDate: new Date("2026-05-25"),
  endDate: new Date("2026-07-31"),
  description: "Summer break period"
}
```

---

## Graduate School Schedule

### First Trimester
```javascript
{
  title: "Graduate School - First Trimester",
  category: "semester_start",
  eventDate: new Date("2025-01-27"),
  endDate: new Date("2025-05-11"),
  description: "First trimester for graduate students"
}
```

### Second Trimester
```javascript
{
  title: "Graduate School - Second Trimester",
  category: "semester_start",
  eventDate: new Date("2025-05-19"),
  endDate: new Date("2025-08-31"),
  description: "Second trimester for graduate students"
}
```

### Third Trimester
```javascript
{
  title: "Graduate School - Third Trimester",
  category: "semester_start",
  eventDate: new Date("2025-09-08"),
  endDate: new Date("2025-12-21"),
  description: "Third trimester for graduate students"
}
```

---

## Implementation Instructions

### 1. Firebase Setup

```javascript
// File: firebase/academicCalendarData.js

import { db } from "./firebaseConfig.js";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function importAcademicCalendar() {
  const events = [
    {
      title: "First Day of Actual Service",
      category: "semester_start",
      eventDate: Timestamp.fromDate(new Date("2025-08-04")),
      semester: "first",
      description: "Classes begin for First Semester AY 2025-2026"
    },
    {
      title: "Classes Start",
      category: "semester_start",
      eventDate: Timestamp.fromDate(new Date("2025-08-11")),
      semester: "first",
      description: "Regular class sessions commence"
    },
    // Add all other events...
  ];

  for (const event of events) {
    await addDoc(collection(db, "academic_calendar"), event);
    console.log(`Added: ${event.title}`);
  }
}
```

### 2. Display in Bulletin Board

```javascript
// File: app.js

function listenAcademicCalendar() {
  const now = new Date();
  const oneMonthAhead = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
  
  const q = query(
    collection(db, "academic_calendar"),
    where("eventDate", ">=", Timestamp.fromDate(now)),
    where("eventDate", "<=", Timestamp.fromDate(oneMonthAhead)),
    orderBy("eventDate", "asc")
  );
  
  onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    renderAcademicEvents(calendarContainer, events);
  });
}

function renderAcademicEvents(container, events) {
  container.innerHTML = "";
  
  events.forEach(event => {
    const div = document.createElement("div");
    div.className = `calendar-event ${event.category}`;
    
    const eventDate = event.eventDate.toDate();
    const dateStr = eventDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    div.innerHTML = `
      <div class="event-date">${dateStr}</div>
      <div class="event-title">${event.title}</div>
      <div class="event-category">${event.category.replace('_', ' ')}</div>
      ${event.description ? `<div class="event-desc">${event.description}</div>` : ''}
    `;
    
    container.appendChild(div);
  });
}
```

### 3. Admin Dashboard Integration

```javascript
// Add to dashboard.js for admins to manage academic calendar

async function addAcademicEvent() {
  const eventData = {
    title: titleInput.value,
    category: categorySelect.value,
    eventDate: Timestamp.fromDate(new Date(eventDateInput.value)),
    endDate: endDateInput.value ? Timestamp.fromDate(new Date(endDateInput.value)) : null,
    semester: semesterSelect.value,
    year: yearSelect.value,
    description: descriptionInput.value
  };
  
  await addDoc(collection(db, "academic_calendar"), eventData);
}
```

---

**Data Source:** CTU University Calendar for Academic Year 2025-2026  
**Document Version:** 1.0  
**Last Updated:** February 10, 2026
