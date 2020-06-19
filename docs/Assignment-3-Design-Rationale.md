# Design Rationale

##Data Model

From Assignment 2, we incorporated the Dependency Inversion Principle by creating a DataSource interface. By creating an abstract interface for the Store to depend on, we were able to introduce a hinge point that allows the source of the data to change. In addition this allows us it emply the Open/Closed Principle, as the DataSource interface allowed us to easily extend functionality to include the fetching of blood pressures. By modelling the Data Model classes closely to their representation on the FHIR server in assignment 2, we were able to reuse Observation to hold our blood pressure readings.

In regards to Package Level Design Principles, the Common Reuse Principle was considered when creating the Data Model package. As these classes model elements from a medical record system and contain many composition relationships, these classes will be reused together.

