import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import readFolder from '../../api/read-folder';
import getStat from '../../api/get-stat';

const DEFAULT_PATH = './';

class FileInspector extends PureComponent {
    constructor() {
        super();
        this.handleReadError = this.handleReadError.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.goUpper = this.goUpper.bind(this);
        this.state = {
            currentPath: [],
            files: []
        };
    }

    componentDidMount() {
        const initialPath = path.resolve(DEFAULT_PATH);

        readFolder(initialPath)
            .then(files => this.setState({
                files,
                currentPath: initialPath.split('\\')
            }))
            .catch(this.handleReadError);
    }

    onSelect(name) {
        const {currentPath} = this.state;
        const {onSelect} = this.props;

        const fullPath = `${currentPath.join('/')}/${name}`;

        getStat(fullPath)
            .then((stat) => {
                if (stat.isFile()) {
                    onSelect(fullPath);
                } else if (stat.isDirectory) {
                    readFolder(fullPath)
                        .then(files => this.setState({
                            files,
                            currentPath: fullPath.split('/')
                        }))
                        .catch(this.handleReadError);
                }
            })
            .catch(this.handleReadError);
    }

    setResultsToState(results) {
        this.setState({files: results});
    }

    handleReadError(err) {
        console.log(err);
    }

    goUpper() {
        const {currentPath} = this.state;
        const newPath = currentPath.slice(null, -1);

        if (currentPath.length > 1) {
            readFolder(`${newPath.join('/')}/`)
                .then(files => this.setState({
                    files,
                    currentPath: newPath
                }))
                .catch(this.handleReadError);
        }
    }

    render() {
        const {files, currentPath} = this.state;

        return (
            <Fragment>
                <button onClick={this.goUpper}>УП</button>
                <div>{currentPath.join('/')}</div>
                {files.map(({name, isDirectory}) => (
                    <div onDoubleClick={() => this.onSelect(name)} style={{cursor: 'pointer'}} key={name}>
                        {isDirectory && <span>&#128194;</span>}
                        <span>{name}</span>
                    </div>
                ))}
            </Fragment>
        );
    }
}

FileInspector.propTypes = {
    onSelect: PropTypes.func.isRequired
};

export default FileInspector;
