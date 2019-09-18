import React, {PureComponent, Fragment} from 'react';
import {TEAM_NAME, CAPTAIN, PLAYER} from '../../../app/constants/field-names';

class RegistrationForm extends PureComponent {
    constructor() {
        super();
        this.change = this.change.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.state = {
            formValues: {
                teamName: '',
                captain: '',
                player1: ''
            }
        };
    }

    change({target: {name, value}}) {
        this.setState(({formValues: oldValues}) => ({
            formValues: {
                ...oldValues,
                [name]: value
            }
        }));
    }

    addPlayer() {
        this.setState(({formValues: oldValues}) => {
            const {teamName, captain, ...players} = oldValues;

            return {
                formValues: {
                    ...oldValues,
                    [`${PLAYER}${Object.values(players).length + 1}`]: ''
                }
            };
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
                    <input
                        name={name}
                        key={name}
                        placeholder={name}
                        value={formValues[name]}
                        onChange={this.change}
                    />))
                }
                <button onClick={this.addPlayer}>Add player</button>
            </Fragment>
        );
    }
}

export default RegistrationForm;
