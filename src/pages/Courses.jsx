import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { useLocalStorage } from 'hooks'
import { CourseList, CourseSearch, Filters } from 'components/courses'

const Container = styled.div`
  display: flex;
`

const Courses = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>

      <CourseSearch showFilters={showFilters} onClick={handleClick} />
      <CourseList showFilters={showFilters} />
      <Filters showFilters={showFilters} onClick={handleClick} />
    </Container>
  )
}

export default Courses
