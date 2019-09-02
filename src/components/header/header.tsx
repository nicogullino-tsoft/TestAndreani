// import { connect } from 'react-redux';
import * as React from 'react';
import { Menu, Segment, Dropdown, MenuItemProps, DropdownProps, Icon, Popup, Form } from 'semantic-ui-react';
import HeaderProps from './HeaderProps';
import HeaderState from './HeaderState';
import Btn from '../buttons/btn';

const btnEdit = require('../buttons/img/pencil.png');
const btnCancel = require('../buttons/img/cancel.png');
const btnSave = require('../buttons/img/save.png');
const logoTsoft = require('./img/logo_tsoft.png');
// import { getUserName } from '../../actions/user';
import axios, { setCurrentToken } from '../../api';
import { randomFill } from 'crypto';

class Header extends React.Component<HeaderProps, HeaderState> {

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      activeItem: 'home',
      userName: '',
      logged: true,
      editInput: true
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.credentialUser = this.credentialUser.bind(this);
  }

  public componentDidMount() {
    this.credentialUser();
  }

  public logOut = () => {
    localStorage.clear();
    this.setState({ userName: '' });
    setCurrentToken(null);
  }

  public render() {
    const { activeItem } = this.state;
    return (
      <Segment inverted id="header">
        <Menu inverted pointing secondary attached="top" className="container">
          <Menu.Item>
            <h1 className="logo firstlogo"><a href="/repository">Dev<span>S</span>core</a></h1>
          </Menu.Item>
          <Dropdown
            item
            text="Administration"
            active={activeItem === 'Administration'}
            onClick={this.handleItemClick}>
            <Dropdown.Menu id="hdrSubmenu">
              <Dropdown.Item >
                <a
                  href="/providers"
                  className="hdrDropItem">Providers</a>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item >
                <a href="/credential" className="hdrDropItem">Credential</a>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item><a href="/repositories" className="hdrDropItem">Repositories </a></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item><a href="/project" className="hdrDropItem">Projects </a></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown
            item
            text="Security"
            active={activeItem === 'Security'}
            onClick={this.handleItemClick}>
            <Dropdown.Menu id="hdrSubmenuSecurity">
              <Dropdown.Item>
                <a
                  href="/roles"
                  className="hdrDropItem">Roles</a>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <a href="/users" className="hdrDropItem">Users</a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item href="/history" onClick={this.handleItemClick} className="hdrDropItem"> Scan history </Menu.Item>
          <Menu.Menu position="right" >
            <Popup
              className="hdrPopup"
              trigger={
                <Menu.Item className="hdrDropItem">
                  <Icon name="user outline" className="iconUser" />
                  <a href="#">{this.state.userName}</a>
                </Menu.Item>
              }
              content={<Form><Form.Field>
                <label>Name</label>
                <input
                  type="text" name="Name"
                  placeholder="Name"
                  disabled={this.state.editInput} />
                <label>Surname</label>
                <input
                  type="text" name="Surname"
                  placeholder="Surname"
                  disabled={this.state.editInput} />
                <label>e-mail</label>
                <input
                  type="text" name="e-mail"
                  placeholder="e-mail"
                  disabled={this.state.editInput} />
                <label>Password</label>
                <input
                  type="password" name="pass"
                  placeholder="***********"
                  disabled={this.state.editInput} />
                {!this.state.editInput
                  && <div>
                    <label>Confirm password</label>
                    <input
                      type="password" name="passConfirm"
                      placeholder="***********"
                      disabled={this.state.editInput} />
                  </div>}
                <div>
                  {this.state.editInput
                    ? <Btn
                      label="Edit"
                      img={btnEdit}
                      id={randomFill}
                      btnState={false}
                      onClick={this.onEdit} />
                    : <div className="pvdBtn">
                      <Btn
                        id=""
                        label="Save"
                        img={btnSave}
                        onClick={this.save}
                        btnState={false} />
                      <Btn
                        id=""
                        label="Cancel"
                        img={btnCancel}
                        onClick={this.closePopup}
                        btnState={false} />
                    </div>}
                </div>
              </Form.Field></Form>}
              on="click"
              hideOnScroll
            />
            {/* <Icon name="user outline" className="iconUser" /> */}
            <Menu.Item href="/login" onClick={this.logOut} className="hdrDropItem">LogOut</Menu.Item>
          </Menu.Menu>
          <Menu.Item>
            <div className="tsoft">
              <div className="logo">
                <img src={logoTsoft} />
              </div>
            </div>
          </Menu.Item>
        </Menu>
      </Segment>
    );
  }

  private credentialUser() {
    axios.get('/users/me').then((data: any) => {
      if (data.data.username !== '') {
        this.setState({ userName: data.data.username });
      } else {
        this.setState({ userName: 'User Name' });
      }
    });
  }

  private handleItemClick(
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLElement>,
    data: MenuItemProps | DropdownProps) {
    this.setState({ activeItem: data.name });
  }

  private onEdit = () => {
    this.setState({ editInput: false });
  }

  private save = () => {
    // const datos = {
    //   email: '',
    //   firstname: '',
    //   lastname: '',
    // };
    // const id = 1;
    // axios.put('/users/' + id, datos).then((data) => {
    //   console.log(data);
    // });

    // const password = {
    //   password:''
    // };
    // axios.put('/users/password', password).then((data) => {
    //   console.log(data);
    // });
  }

  private closePopup = () => {
    this.setState({ editInput: true });
  }
}

// const mapStateToProps = (state: any, props: any) => {
//   return {
//     user: state.user,
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     getUserName: () => (dispatch(getUserName())),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;