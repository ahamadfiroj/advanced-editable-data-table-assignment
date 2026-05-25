import { StatusLine, StatusWrap } from './Status.styles.js'

function Status({ totalRows, hasUnsavedChanges }) {
  return (
    <StatusWrap>
      <p>
        Showing <strong>{totalRows.toLocaleString()}</strong> rows
      </p>
      <StatusLine $unsaved={hasUnsavedChanges}>
        {hasUnsavedChanges ? 'Unsaved row edits' : 'All changes saved'}
      </StatusLine>
    </StatusWrap>
  )
}

export default Status
