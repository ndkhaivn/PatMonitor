import React, { useState } from "react"
import { MenuItem, Label, InputGroup } from "@blueprintjs/core";
import { Select, ItemRenderer, MultiSelect } from "@blueprintjs/select";

const PatientMultiSelect = MultiSelect.ofType<string>();

export default function PatientSelect() {

  const [query, setQuery] = useState("")
  const patients = ["John Doe", "Patient 1", "Patient 2"]

  const filterPatient = (patients: string[], query: string) => {
    if (!patients) {
      return []
    }

    return patients.filter((patient: string) => {
      const normalizedName = patient.toLowerCase();
      const normalizedQuery = query.toLowerCase();
      return normalizedName.indexOf(normalizedQuery) >= 0;
    });
  }

  const renderPatient: ItemRenderer<string> = (patient: string, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return (
        <MenuItem
            // icon={this.isFilmSelected(film) ? "tick" : "blank"}
            key={patient}
            text={`${patient}`}
        />
    );
};

  return (
    <div>
      <Label>
        <PatientMultiSelect
          items={filterPatient(patients, query)}
          itemRenderer={renderPatient}
          // onItemSelect={this.handleItemSelect}
          query={query}
          onQueryChange={setQuery}
          onItemSelect={() => {}}
          tagRenderer={(patient: string) => patient}

        >
          <InputGroup
            fill={false}
            placeholder="Select Tenant..."
            // value={}
            leftIcon="caret-down"
          />
        </PatientMultiSelect>
      </Label>
    </div>
  )
}
