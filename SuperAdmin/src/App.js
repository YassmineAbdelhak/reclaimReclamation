import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import { PrivateRouter } from "./PrivateRouter";
const EditRecWor = React.lazy(() => import('pages/EditRecWor'));
const AlertPage = React.lazy(() => import('pages/AlertPage'));
const DoneReclamation = React.lazy(() => import('pages/DoneReclamation'));
const WorkingOnReclamation = React.lazy(() => import('pages/WorkingOnReclamation'));
const AllReclamation = React.lazy(() => import('pages/AllReclamation'));
const AdminDoneReclamation = React.lazy(() => import('pages/AdminDoneReclamation'));
const AdminWorkingOnRec = React.lazy(() => import('pages/AdminWorkingOnRec'));
const AdminAllRec = React.lazy(() => import('pages/AdminAllRec'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const EditEmployee = React.lazy(() => import('pages/EditEmployee')); 
const EditRec = React.lazy(() => import('pages/EditRec')); 
const AddEmployee = React.lazy(() => import('pages/AddEmployee'));
const EmployeesList = React.lazy(() => import('pages/EmployeesList'));
const AddDepartement = React.lazy(() => import('pages/AddDepartement'));
const ReclamationType = React.lazy(() => import('pages/ReclamationType'));
/* const InputGroupPage = React.lazy(() => import('pages/InputGroupPage')); */
 const ModalPage = React.lazy(() => import('pages/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/ProgressPage')); 
/* const TablePage = React.lazy(() => import('pages/TablePage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage')); */
const WidgetPage = React.lazy(() => import('pages/WidgetPage')); 
const EditRecType = React.lazy(() => import('pages/EditRecType'));
const EditDepartment = React.lazy(() => import('pages/EditDepartment'));


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/AllReclamation').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>{/* 
                <PrivateRouter name="Home" component={PrivateRouter} path="/login" />   */}
                <Route exact path="/login-modal" component={AuthModalPage} />
               {/*  <Route exact path="/buttons" component={ButtonPage} /> */}
                {/* <Route exact path="/cards" component={CardPage} /> */}
                <Route exact path="/widgets" component={WidgetPage} />
               {/*  <Route exact path="/typography" component={TypographyPage} /> */}
                {/* <Route exact path="/alerts" component={AlertPage} /> */}
                <Route exact path="/AllReclamation" component={AllReclamation} />
                <Route exact path="/doneReclamation" component={DoneReclamation} />
                <Route exact path="/WorkingOnReclamation" component={WorkingOnReclamation} />
                <Route exact path="/AdminAllRec" component={AdminAllRec} />
                <Route exact path="/AdminDoneReclamation" component={AdminDoneReclamation} />
                <Route exact path="/AdminWorkingOnRec" component={AdminWorkingOnRec} />
                <Route exact path="/update/:id" component={EditDepartment} /> 
                <Route exact path="/updates/:id" component={EditEmployee} />
                <Route exact path="/updateRec/:id" component={EditRec} />
                <Route exact path="/updateRecW/:id" component={EditRecWor} />
                 <Route exact path="/modals" component={ModalPage} /> 
                <Route exact path="/addEmployee" component={AddEmployee} />
                <Route exact path="/employeesList" component={EmployeesList} />
                <Route exact path="/addDepartement" component={AddDepartement} />
                <Route exact path="/reclamationType" component={ReclamationType} />
                <Route exact path="/edit/:id" component={EditRecType} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/login" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
