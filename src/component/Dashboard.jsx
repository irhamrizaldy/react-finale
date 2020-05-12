import React from 'react';

const Dashboard = (props) => {
    return (
        <div class="container">
            <div class="panel panel-default">
                <div class="panel-heading">
                </div>
                <div class="panel-body">
                    <table class="table table-stripe">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.title}</td>
                                <td>{props.description}</td>
                                <td>{props.price}</td>
                                <td><button className="btn btn-sm btn-warning" onClick={() => { if (window.confirm('Are you sure delete this item?')) props.deleteItem(props.idProduct) }}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;