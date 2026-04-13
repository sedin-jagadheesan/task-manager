# Task Manager Web App

## Overview
A simple and interactive Task Manager built using **HTML, CSS, and JavaScript**.  
Users can create, manage, and track their tasks with priority levels.

## Features
- Create Tasks
- Priority Levels (High, Medium, Low)
- Mark as Completed
- Delete Tasks
- Auto Sorting (Priority + Latest)
- Local Storage Support (Data save aagum)
- Input Validation (Duplicate & min length check)

## UI Pages
### Home Page
- Welcome screen
- "Create Task" button

### Task Page
- Task form (Title, Priority, Description)
- Task list display
- Complete & Delete actions

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript

## How It Works
### 1.Task Creation
- User enters title, priority, description
- Validation check:
- Minimum 3 characters
- No duplicate titles

### 2.Task Storage
- Tasks stored in `localStorage`
- Page refresh pannalum data safe

### 3.Sorting Logic
```js
High → Medium → Low
Same priority → Latest first