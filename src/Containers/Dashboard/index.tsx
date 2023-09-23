import React, { useEffect, useState } from "react";
import { Form, Button, Space, Table, Card } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from "react-router-dom";

interface DataType {
    id: string;
    name: string;
    is_active: string | number | boolean;
}

// interface ApiResponse {
//     result: DataType[];
// }

const Dashboard: React.FC = () => {
    const apiUrl = "https://mock-api.arikmpt.com/api/category/";
    const validate = localStorage.getItem('token');
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    const [data, setData] = useState<DataType[]>([]);

    const fetchData = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${validate}`,
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(response)
                    setData(data.data);
                } else {
                }
            } catch (error) {
                // Handle fetch error here
            }
        };
        useEffect(() => {
            fetchData();
    }, [])

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (isActive) => (
                <span>{isActive ? 'Active' : 'Deactive'} </span>
            ),
            filters: [
                { text: 'Active', value: true },
                { text: 'Deactive', value: false },
            ],
            onFilter: (value, record) => record.is_active === value,
        },
        {
            title: "Action",
            key: 'action',
            render: () => (
                <Space>
                    <Button href="/edit-item">Edit</Button>
                    <Button type="primary">Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <Card style={{ padding: '20px' }}>
            <Form.Item>
                <Button type='primary' className="login-link" onClick={() => navigate("/")} style={{ marginRight: '550px' }}>
                    Add New Category
                </Button>
                <Button type="primary" className="login-link" onClick={handleLogout}>
                    Logout
                </Button>
            </Form.Item>
            <Table
                columns={columns}
                dataSource={data} 
                pagination={{
                    pageSize: 6,
                    total: data.length,
                }}
                style={{ width: '800px'}}
                rowKey="id" 
            />
        </Card>
    );
};

export default Dashboard;
