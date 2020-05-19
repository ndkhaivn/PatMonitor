import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Icon } from '@blueprintjs/core';
import { useState } from 'react';
import PatientInfoDialog from './PatientInfoDialog';
import Patient from '../DataModel/Patient';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store';

function PatientsTable({columns, onClickRow} : {columns: any[], onClickRow: (row: Patient) => void}) {

  const data: Patient[] = useSelector((state: ApplicationState) => state.patients.data);

  const loading = false;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }

  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 }
    },
    useSortBy,
    usePagination
  );

  console.log("rendering table");

  return (
    <div>
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
                      <Icon
                        icon={
                          column.isSorted
                            ? column.isSortedDesc
                              ? 'caret-down'
                              : 'caret-up'
                            : 'double-caret-vertical'
                        }
                      />
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => onClickRow(row.original)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}

            <tr>
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td colSpan={5}>Loading...</td>
              ) : (
                <td colSpan={5}>
                  Showing {page.length} of {data.length} results
                </td>
              )}
            </tr>
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1}/{pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

      </div>


    </div>
  );
}

export default React.memo(PatientsTable);