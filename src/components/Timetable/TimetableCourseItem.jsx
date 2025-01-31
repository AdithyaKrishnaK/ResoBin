import { Tooltip } from 'antd'
import { darken } from 'polished'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components/macro'

import { cols, rows, slots } from 'data/timetable'
import { selectCourseTitle } from 'store/courseSlice'
import { colorPicker, makeGradient } from 'styles/utils'

// * id refers to the color of the timetable item
const TimetableCourseItem = ({ data, colorCode = 0 }) => {
  const { course: code, lectureSlots } = data
  const title = useSelector(selectCourseTitle(code))

  if (!lectureSlots || lectureSlots.length === 0) return null
  const courseSlots = lectureSlots.map((slot) => slots[slot])

  const TimetableCourseLectureItem = ({ gridCol, gridRow }) => (
    <GridItem row={gridRow} col={gridCol}>
      <Tooltip title={title}>
        <Item id={colorCode}>
          <h3>{code}</h3>
          <span>
            {gridRow.start.title} - {gridRow.end.title}
          </span>
        </Item>
      </Tooltip>
    </GridItem>
  )

  return (
    <>
      {courseSlots.map(({ row, col }, idx) => (
        <TimetableCourseLectureItem
          key={String(idx)}
          gridCol={cols[col - 1]}
          gridRow={{ start: rows[row.start], end: rows[row.end] }}
        />
      ))}
    </>
  )
}

export default TimetableCourseItem

const GridItem = styled.div`
  grid-row: ${({ row }) => row.start.id} / ${({ row }) => row.end.id};
  grid-column: ${({ col }) => col.id};
  color: ${({ theme }) => theme.textColor};
`

const getTile = (color) => css`
  border-left: 4px solid ${darken(0.2, color)};
  color: ${darken(0.7, color)};
  background: ${makeGradient(color)};
`

const Item = styled.div`
  height: 100%;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 200ms ease-out;

  ${({ id }) => getTile(colorPicker(id))}

  & > h3 {
    font-size: 1rem;
  }

  & > span {
    display: block;
    font-size: 0.75rem;
  }

  &:hover {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  }
`
