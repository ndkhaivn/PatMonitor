# Script Outline

## Introduction (20 seconds)

Outline parts done by each member

- Kai: data store and user interface
- Matt: data model and testing

## Application walkthrough (1.5 minutes)

- Input practitioner id
- Show patient list
- Add patients
- View additional info
- Remove patient
- Add additional patients
- Add refresh rate
- Change refresh rate

## Data model walk through (0.5 - 1 minute)

- Dependency Inversion principle : Store depends on DataSource interface allowing for implementation of data source to change.
- Open/Closed Principle: Data Source interface allows for additional functionality to be added whilst maintaining a stable and well defined interface
- Possible inheritance if attributes shared by Practitioner and Patient
- Possible refactor of Observation to be an abstract class and cholesterol to inherit from it, adds a hinge point to add additional types of observations

## Data store and UI components (2 - 2.5 minutes)

