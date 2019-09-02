import { connect } from 'react-redux';
import * as React from 'react';
import { dispatchGetCountProject } from '../../actions/projects';
import { dispatchGetProject } from '../../actions/projects';
import { dispatchGetProjectById } from '../../actions/projects';
import { dispatchGetRepository } from '../../actions/repositories';
import { dispatchPostProject } from '../../actions/projects';
import { dispatchPutProject } from '../../actions/projects';
import { dispatchPutProjectStatus } from '../../actions/projects';
import ContentModalProject from './contentModalProjects';
import AbmView from '../../components/abm/abmView';
import ProjectsViewProps from './ProjectsViewProps';
import ProjectsViewState from './ProjectsViewState';
// import axios from '../../api';
import ModelDefinition from '../../components/abm/ModelDefinition';
import { dispatchGetCredential } from '../../actions/credentials';
import { dispatchGetProvider } from '../../actions/providers';

class ProjectsView extends React.Component<ProjectsViewProps, ProjectsViewState> {
    constructor(props: ProjectsViewProps) {
        super(props);
        this.state = {
            saveProjectModel: null,
            projectId: null,
            size: 4,
            project: this.props.project,
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
                    label: 'Description',
                    property: 'description',
                    visible: true,
                    type: 'field'
                },
                {
                    label: 'Credential',
                    property: 'credentialData',
                    visible: true,
                    type: 'field'
                },
                {
                    label: 'Provider',
                    property: 'providerData',
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
            title: 'Project',
            abm: <ContentModalProject
                receiveAction={this.receiveAction}
                getRecordById={this.props.getProjectsById}
                projectId={this.state.projectId}
                postProjects={this.props.postProjects}
                putProjects={this.props.putProjects}
                getAllRepositories={this.props.getAllRepositories}
                getAllCredentials={this.props.getAllCredentials}
                getAllProviders={this.props.getAllProviders}
                disableBtn={(disableBtn: boolean) => this.setState({ disableBtn })} 
                readOnly={this.state.view === 'View' ? true : false}/>
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
            '/projects/'
        );
        return miModel;
    }

    public render() {
        return (
            <div className="projects">
                <AbmView
                    modelDefinition={this.getModelDefinition()}
                    data={undefined}
                    dataPagination={this.props.getProjects}
                    actionSave={this.saveProject}
                    actionEdit={(id: number, view: string | undefined) => this.setState({ projectId: id, view })}
                    putStatus={this.props.putProjectsStatus}
                    allElements={this.props.getCountProject}
                    size={this.state.size}
                    disableBtn={this.state.disableBtn}
                />
            </div>
        );
    }

    private saveProject = () => this.state.saveProjectModel();

    private receiveAction = (saveProjectChild: any) => {

        this.setState({ saveProjectModel: saveProjectChild, projectId: null, disableBtn: true });

    }

    // private pagination = (e: any) => {
    //     if (this.state.countPage !== undefined) {
    //         let num: number;
    //         if (!Number.isInteger(this.state.countPage / this.state.size)) {
    //             num = this.state.countPage / this.state.size;
    //         } else {
    //             num = 0;
    //         }
    //         const num1: number = num;
    //         if (parseInt(e.target.attributes.value.value, 10) >= 1
    //             && parseInt(e.target.attributes.value.value, 10) <= num1
    //             ? Math.round(this.state.countPage / this.state.size) + 1
    //             : this.state.countPage / this.state.size) {
    //             const page = parseInt(e.target.attributes.value.value, 10) - 1;
    //             // this.axiosPaginable(page);
    //         }
    //     }
    // }

    // private axiosPaginable = (page: number) => {
    //     axios.get('/projects?page=' + page + '&size=' + this.state.size).then((r) => {
    //         this.setState({ project: r.data, page });
    //     });
    // }

    // private axiosCountPaginable = () => {
    //     axios.get('/projects/count').then((r) => {
    //         this.setState({ countPage: r.data.count });
    //         this.axiosPaginable(0);
    //     });
    // }
}

const mapStateToProps = (state: { project: { project: any; }; }, props: any) => {
    return {
        project: state.project.project,
    };
};

const mapDispatchToProps = (dispatch: any) => {

    return {
        getCountProject: () => (dispatch(dispatchGetCountProject())),
        getProjects: (page: number, size: number) => (dispatch(dispatchGetProject(page, size))),
        getProjectsById: (id: number | null) => (dispatch(dispatchGetProjectById(id))),
        postProjects: (data: object) => (dispatch(dispatchPostProject(data))),
        putProjects: (id: number, data: object) => (dispatch(dispatchPutProject(id, data))),
        putProjectsStatus: (data: object) => (dispatch(dispatchPutProjectStatus(data))),
        getAllRepositories: () => (dispatch(dispatchGetRepository())),
        getAllCredentials: () => (dispatch(dispatchGetCredential())),
        getAllProviders: () => (dispatch(dispatchGetProvider()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsView);
