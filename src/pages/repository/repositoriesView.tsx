import { connect } from 'react-redux';
import * as React from 'react';
import { dispatchGetProject } from '../../actions/projects';
import { dispatchGetRepository } from '../../actions/repositories';
import { dispatchGetRepositoryById } from '../../actions/repositories';
import { dispatchPostRepository } from '../../actions/repositories';
import { dispatchPutRepository } from '../../actions/repositories';
import { dispatchPutRepositoryStatus } from '../../actions/repositories';
import { dispatchGetCountRepository } from '../../actions/repositories';
import ContentModalRepositories from './contentModalRepositories';
import AbmView from '../../components/abm/abmView';
import RepositoriesViewProps from './RepositoriesViewProps';
import RepositoriesViewState from './RepositoriesViewState';
// import axios from '../../api';
import ModelDefinition from '../../components/abm/ModelDefinition';
import { dispatchGetCredential } from '../../actions/credentials';
import { dispatchGetProvider } from '../../actions/providers';

class RepositoriesView extends React.Component<RepositoriesViewProps, RepositoriesViewState> {
  constructor(props: RepositoriesViewProps) {
    super(props);
    this.state = {
      saveRepositoryModel: null,
      repositoryId: null,
      size: 3,
      repository: this.props.repository,
      disableBtn: true,
      view: undefined
    };

    this.receiveAction = this.receiveAction.bind(this);

  }

  public getModelDefinition = () => {
    const arrayColumns: Array<{
      label: string,
      property: string,
      visible: boolean,
      type: string
    }> = [
        {
          label: 'Id',
          property: 'id',
          visible: false,
          type: 'field'
        },
        {
          label: 'Name',
          property: 'name',
          visible: true,
          type: 'field'
        },
        {
          label: 'Credential',
          property: 'credential',
          visible: true,
          type: 'field'
        },
        {
          label: 'URL',
          property: 'url',
          visible: true,
          type: 'field'
        },

        {
          label: 'Provider',
          property: 'provider',
          visible: true,
          type: 'field'
        },
        {
          label: 'State',
          property: 'enabled',
          visible: true,
          type: 'control'
        },
        {
          label: 'Edit',
          property: 'id',
          visible: true,
          type: 'control'
        }
      ];

    const objectModalContent: {
      title: string,
      abm: any
    } = {
      title: 'Repository',
      abm: <ContentModalRepositories
        receiveAction={this.receiveAction}
        getRecordById={this.props.getRepositoriesById}
        repositoryId={this.state.repositoryId}
        postRepositories={this.props.postRepositories}
        putRepositories={this.props.putRepositories}
        getAllCredentials={this.props.getAllCredentials}
        getAllProviders={this.props.getAllProviders}
        getAllProjects={this.props.getAllProjects}
        disableBtn={(disableBtn: boolean) => this.setState({ disableBtn })}
        readOnly={this.state.view === 'View' ? true : false}
      />
    };
    const miModel: ModelDefinition = new ModelDefinition(
      arrayColumns,
      objectModalContent,
      'id',
      true,
      true,
      true,
      true,
      true,
      '/repositories/'
    );
    return miModel;
  }

  public render() {
    return (
      <div className="repositories">
        <AbmView
          modelDefinition={this.getModelDefinition()}
          data={undefined}
          dataPagination={this.props.getRepositories}
          actionSave={this.saveRepository}
          actionEdit={(id: number, view: string | undefined) => this.setState({ repositoryId: id, view })}
          putStatus={this.props.putRepositoriesStatus}
          allElements={this.props.getCountRepository}
          size={this.state.size}
          disableBtn={this.state.disableBtn}
        />
      </div>
    );
  }

  private saveRepository = () => this.state.saveRepositoryModel();

  private receiveAction = (saveRepositoryChild: any) => {

    this.setState({ saveRepositoryModel: saveRepositoryChild, repositoryId: null, disableBtn: true });

  }
}

const mapStateToProps = (state: { repository: { repository: any; }; }, props: any) => {
  return {
    repository: state.repository.repository,
  };
};

const mapDispatchToProps = (dispatch: any) => {

  return {
    getCountRepository: () => (dispatch(dispatchGetCountRepository())),
    getRepositories: (page: number, size: number) => (dispatch(dispatchGetRepository(page, size))),
    getRepositoriesById: (id: number | null) => (dispatch(dispatchGetRepositoryById(id))),
    postRepositories: (data: object) => (dispatch(dispatchPostRepository(data))),
    putRepositories: (id: number | null, data: object) => (dispatch(dispatchPutRepository(id, data))),
    putRepositoriesStatus: (data: object) => (dispatch(dispatchPutRepositoryStatus(data))),
    getAllCredentials: () => (dispatch(dispatchGetCredential())),
    getAllProviders: () => (dispatch(dispatchGetProvider())),
    getAllProjects: (page?: number, size?: number) => (dispatch(dispatchGetProject(page, size))),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesView);
