#Design Rationale

##Data Model

When designing the data model, the Dependency Inversion Principle was considered. This was incorporated by creating a DataSource interface. This allows for the Store to depend on the abstract interface of DataSource rather than the concrete class of FHIRServer. In doing this, we provide a hinge point that allows for the the source of our data to be changed for example a local database.  In addition the use of a DataSource interface allows us to employ the Open/Closed Principle. The DataSource interface allows for additional functionality to be added whilst maintaining a stable and well defined set of methods.

