import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import { selectUsers,selectPage,selectSize,selectTotalSize } from "../../redux/selectors/UserSelector";
import {getListUserAction} from "../../redux/actions/UserActions";
import UserApi from "../../api/UserApi";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import CustomSearch from "./CustomSearch";
import * as Icon from 'react-feather';

import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';
// import { FastField, Form, Formik } from "formik";
// import { ReactstrapInput } from "reactstrap-formik";
// import * as Yup from 'yup';
// import { toastr } from "react-redux-toastr";

const tableColumns = [
  {
    dataField: "username",
    text: "User name",
    sort: true
  },
  {
    dataField: "email",
    text: "Email",
    sort: true
  },
  {
    dataField: "firstName",
    text: "Frist name",
    sort: true
  },
  {
    dataField: "lastName",
    text: "Last name",
    sort: true
  },
  {
    dataField: "role",
    text: "Role",
    sort: true
  }
];


const User = (props) =>{
  const getListUser = props.getListUserAction;
  const size = props.size;
  useEffect(() =>{
    const getAllUser = async() =>{
      const result = await UserApi.getAllUsers(1, size);
      const users = result.content;
      const totalSize = result.totalElements;
      getListUser(users,1,totalSize);
    }
    getAllUser();
  },[getListUser,size]);

  const handleTableChange = async (type, { page ,sizePerPage,sortField, sortOrder, searchText }) => {
    //sort
    if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
      sortField = 'id'
      sortOrder = 'desc';
    }
  
    // // filter
    // const filter = filters && filters.totalMember && filters.totalMember.filterVal ? filters.totalMember.filterVal : null;
    // const minTotalMember = filter && filter.minTotalMember ? filter.minTotalMember : null;
    // const maxTotalMember = filter && filter.maxTotalMember ? filter.maxTotalMember : null;
  
    //get data from api
    const result = await UserApi.getAllUsers(page, size,sortField,sortOrder, searchText);
    const users = result.content;
    const totalSize = result.totalElements;
    //update group data to store
    getListUser(users, page, totalSize);
  }
  
    // filter component visibility
    // const [isVisiableFilter, setVisiableFilter] = useState(false);

    // const handleChangeFilter = (minTotalMember, maxTotalMember) => {
    //   onTotalMemberFilter({
    //     minTotalMember,
    //     maxTotalMember
    //   });
    // }

   return (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Admin Management</h1>

    <Row>
      <Col>
        <Card>
          
          <CardBody>
          <ToolkitProvider
          keyField="id"
          data={props.users}
          columns={tableColumns}
          search
        >
          {
            toolkitprops => (
            <React.Fragment>
               {/* Filter */}
               {
              //   isVisiableFilter &&
              //   <Row>
              //     <Col lg="12">
              //       <CustomFilter handleChangeFilter={handleChangeFilter} />
              //     </Col>
              //   </Row>
              }
              {/* Search */}
              <Row style={{ alignItems: "center" }}>
                <Col lg="3">
                  <CustomSearch {...toolkitprops.searchProps} />
                </Col>
                <Col lg="9">
                  <div className="float-right pull-right">
                    <Icon.Filter size={24} className="align-middle mr-2" />
                    <Icon.RefreshCcw className="align-middle mr-2" size={24}/>
                    <Icon.PlusCircle className="align-middle mr-2" size={24} />
                    <Icon.Trash2 className="align-middle mr-2" size={24}/>
                  </div>
                </Col>
              </Row>
              <BootstrapTable
              {...toolkitprops.baseProps}
              striped
              hover
              remote
              bootstrap4
              bordered={true}
              pagination={paginationFactory({
                page: props.page,
                sizePerPage: props.size,
                totalSize: props.totalSize,

                nextPageText:'Next',
                prePageText:'Prev',
                // withFirstAndLast: false,
                alwaysShowAllBtns: true,
                hideSizePerPage:true
              })}
              onTableChange={handleTableChange}
            />
            </React.Fragment>
            )
          }
        </ToolkitProvider>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
)};
const mapGlobalStateToProps = state => {
  return {
    users: selectUsers(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state)
    // selectedRows: selectSelectedRows(state)
  };
};
export default connect(mapGlobalStateToProps,{getListUserAction})(User);
 