import React, { useEffect, useContext } from 'react';
import AppContext from '../../context/AppContext';
import Api from '../../services/Api';
import Styled from './S.UsersTable';

const UsersTable = () => {
  const { users, setUsers } = useContext(AppContext);

  const getUsersList = async () => {
    const usersList = await Api.getAllUsers();
    setUsers(usersList);
  }

  const handleClick = async ({ target: { value: id, name: action } }) => {
    await Api.updateAccessLevel(id, action);
    await getUsersList();
  }

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <Styled.Main>
      <Styled.Table>
        <Styled.Thead>
          <Styled.Tr>
            <Styled.Th>Id</Styled.Th>
            <Styled.Th>Nome</Styled.Th>
            <Styled.Th>Telefone</Styled.Th>
            <Styled.Th>Nível de acesso</Styled.Th>
            <Styled.Th>Upgrade</Styled.Th>
            <Styled.Th>Downgrade</Styled.Th>
          </Styled.Tr>
        </Styled.Thead>
        <Styled.Tbody>
          {
            users.map((user) => (
              <Styled.Tr key={ user._id }>
                <Styled.Th>{ user._id }</Styled.Th>
                <Styled.Th>{ user.name }</Styled.Th>
                <Styled.Th>{ user.msisdn }</Styled.Th>
                <Styled.Th>{ user.access_level }</Styled.Th>
                <Styled.Th>
                  <Styled.DivButton>
                    <Styled.Button
                      type="button"
                      name="upgrade"
                      value={ user._id }
                      onClick={ handleClick }
                    >
                      Upgrade
                    </Styled.Button>
                  </Styled.DivButton>
                </Styled.Th>
                <Styled.Th>
                  <Styled.DivButton>
                    <Styled.Button
                      type="button"
                      name="downgrade"
                      value={ user._id }
                      onClick={ handleClick }
                    >
                      Downgrade
                    </Styled.Button>
                  </Styled.DivButton>
                </Styled.Th>
              </Styled.Tr>
            ))
          }
        </Styled.Tbody>
      </Styled.Table>
    </Styled.Main>
  );
};

export default UsersTable;
