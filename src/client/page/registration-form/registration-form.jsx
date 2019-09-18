import React, {PureComponent, Fragment} from 'react';
import {omit} from 'lodash';
import {TEAM_NAME, CAPTAIN, PLAYER} from '../../../app/constants/field-names';

class RegistrationForm extends PureComponent {
    constructor() {
        super();
        this.state = {
            formValues: {
                teamName: '',
                captain: '',
                player1: ''
            }
        };
    }

    signIn = () => {
        const {signIn} = this.props;
        const {formValues} = this.state;

        signIn(formValues);
    }

    change = ({target: {name, value}}) => {
        this.setState(({formValues: oldValues}) => ({
            formValues: {
                ...oldValues,
                [name]: value
            }
        }));
    }

    addPlayer = () => {
        const {formValues} = this.state;
        const {teamName, captain, ...players} = formValues;
        const countOfPlayers = Object.values(players).length;

        if (countOfPlayers < 9) {
            this.setState({
                formValues: {
                    ...formValues,
                    [`${PLAYER}${countOfPlayers + 1}`]: ''
                }
            });
        } 
    }

    deletePlayer = ({target: {name}}) => {
        const {formValues} = this.state;

        this.setState({
            formValues: omit(formValues, name)
        });
    }

    render() {
        const {formValues, formValues: {teamName, captain, ...players}} = this.state;

        return (
            <Fragment>
                <input
                    name={TEAM_NAME}
                    placeholder="Название команды"
                    value={formValues.teamName}
                    onChange={this.change}
                />
                <input
                    name={CAPTAIN}
                    placeholder="Капитан"
                    value={formValues.captain}
                    onChange={this.change}
                />
                {Object.keys(players).map(name => (
                    <div>
                        <input
                            name={name}
                            key={name}
                            placeholder={name}
                            value={formValues[name]}
                            onChange={this.change}
                        />
                        <button name={name} key={name} onClick={this.deletePlayer}>Delete</button>
                    </div>))
                }
                <button onClick={this.addPlayer}>Add player</button>
                <button onClick={this.signIn}>Sign in</button>
            </Fragment>
        );
    }
}

export default RegistrationForm;
