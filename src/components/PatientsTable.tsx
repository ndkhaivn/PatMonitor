import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Icon } from "@blueprintjs/core";
import { useState } from 'react';
import PatientInfoDialog from './PatientInfoDialog';

export default function PatientsTable({ columns, data }: {columns: any[], data: any[]}) {

  const [isDialogOpen, setDialogOpen] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  }, useSortBy);

  return (
    <div>

      <PatientInfoDialog isOpen={isDialogOpen} toggleOpen={() => setDialogOpen(!isDialogOpen)}/>

      <div className="tbl-header" id="patient-table">
        <table {...getTableProps()} cellSpacing={0}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  
                    {column.render('Header')}

                    {/* Add a sort direction indicator */}
                  
                    <span>

                      <Icon icon={column.isSorted ? column.isSortedDesc ? 'caret-down' : 'caret-up' : 'double-caret-vertical'} />
                    </span>

                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} onClick={ () => setDialogOpen(!isDialogOpen) }>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}
