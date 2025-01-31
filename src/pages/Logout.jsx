import { Button } from 'antd'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import styled from 'styled-components/macro'

import { LoaderAnimation } from 'components/shared'
import { logoutAction } from 'store/authSlice'
import { fontSize } from 'styles/responsive'

const Logout = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  const handleLogout = async () => {
    dispatch(logoutAction())
  }

  if (!isAuthenticated) return <Redirect to="/login" />

  return (
    <>
      <Helmet>
        <title>Logout - ResoBin</title>
        <meta name="description" content="Login to continue" />
      </Helmet>

      {loading && <LoaderAnimation fixed />}

      <PageContainer>
        <BoxContainer>
          <h4>Are you sure you want to logout?</h4>

          <StyledButton type="primary" onClick={handleLogout}>
            Logout
          </StyledButton>
        </BoxContainer>
      </PageContainer>
    </>
  )
}

export default Logout

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 3rem);
  background-color: ${({ theme }) => theme.secondary};
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem 0;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.darksecondary};
  box-shadow: 0 0 0.75rem rgba(0, 0, 0, 0.4);

  h4 {
    padding: 0 1.5rem;
    font-size: ${fontSize.responsive.lg};
    font-weight: 300;
    text-align: center;
    letter-spacing: 2px;
    color: ${({ theme }) => theme.textColor};
  }
`

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.25rem;
  margin: 1.5rem 1.5rem 0;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.3);
`
