import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Button, Card } from 'antd';
import './CreateRole.css';

import { fetchMasterResources } from '../../Redux/Actions/Role';

const validate = (values) => {
    const errors = {};

    if (!values.roleName) {
        errors.roleName = 'Role Name is required';
    } else if (/[^a-zA-Z0-9\s]/.test(values.roleName)) {
        errors.roleName = 'Special characters are not allowed';
    }

    return errors;
};

const CreateRole = () => {
    const dispatch = useDispatch();
    const resources = useSelector((state) => state.resources);

    useEffect(() => {
        dispatch(fetchMasterResources());
    }, [dispatch]);

    const onSubmit = async (values) => {
        try {
            alert('Role created successfully!');
        } catch (error) {
            console.error('Error creating role:', error);
            alert('Role creation failed. Please try again.');
        }
    };

    return (
        <div className="create-role-container">
            <h1 className="create-role-heading">Create Role</h1>
            <hr className="horizontal-line" />
            <div className="form-container">
                <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="label">Role Name*</label>
                                <Field
                                    name="roleName"
                                    component="input"
                                    type="text"
                                    placeholder="Enter role name"
                                    className="input-field"
                                />
                                <div className="error-message">
                                    <Field name="roleName">
                                        {({ meta }) =>
                                            meta.error && meta.touched && (
                                                <span className="error">{meta.error}</span>
                                            )
                                        }
                                    </Field>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="label">Permission List*</label>
                                <div className="button-group">
                                    <Field
                                        name="resources"
                                        component="input"
                                        type="text"
                                        placeholder="Enter permission"
                                        className="input-field"
                                    />
                                    <Button type="button" className="search-button">
                                        Search
                                    </Button>
                                    <Button type="button" className="clear-button">
                                        Clear All
                                    </Button>
                                </div>
                            </div>

                            <Card className="card">
                                {resources ? (
                                    <ul className="selected-resources-list">
                                        {resources.map((resource) => (
                                            <li key={resource.id}>
                                                <label className="resource-label">
                                                    <Field
                                                        name={`selectedResources.${resource.id}`}
                                                        component="input"
                                                        type="checkbox"
                                                    />{' '}
                                                    {resource.name}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Loading resources...</p>
                                )}
                            </Card>


                            <div className="button-group">
                                <Button type="button" className="cancel-button">
                                    Cancel
                                </Button>
                                <Button type="submit" className="save-button">
                                    Save
                                </Button>
                            </div>
                        </form>
                    )}
                />
            </div>
        </div>
    );
};

export default CreateRole;
