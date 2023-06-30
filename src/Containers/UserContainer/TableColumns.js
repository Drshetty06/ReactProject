import React from 'react';
import './UserContainer.css';

export const columns = [
    {
        title: 'Role',
        dataIndex: 'roleName',
        key: 'roleName',
    },
    {
        title: 'Created',
        dataIndex: 'createdDate',
        key: 'createdDate',
    },
    {
        title: 'Last Modified',
        dataIndex: 'lastModifiedDate',
        key: 'lastModifiedDate',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: () => (
            <div className="action-buttons">
                <button className="transparent-button">View</button>
                <span className="button-separator">|</span>
                <button className="transparent-button">Edit</button>
                <span className="button-separator">|</span>
                <button className="transparent-button">Delete</button>
            </div>
        ),

    },
];
