import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Line, Bar, Doughnut, Scatter, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        zoom: {
            pan: {
                enabled: true,
                mode: 'xy'
            },
            zoom: {
                wheel: {
                    enabled: true
                },
                pinch: {
                    enabled: true
                },
                mode: 'xy'
            }
        }
    }
};



ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    zoomPlugin
);


const Expense = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchAmount, setSearchAmount] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/expense/get', localStorage.getItem('username'),       {
                headers: {
                  "Content-Type": "text/plain",
                },
              }
        );
            setData(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch data');
        }
    };

    const addData = async () => {
        if (!title.trim() || !amount.trim()) {
            setError('Title and amount are required');
            return;
        }

        const requestBody = { title, amount: parseFloat(amount), username: localStorage.getItem('username')};
        try {
            await axios.post('http://localhost:8080/expense/add', requestBody);
            getData();
            setTitle('');
            setAmount('');
            setError(null);
        } catch (err) {
            setError('Failed to add data');
        }
    };

    const removeData = async (id) => {
        try {
            await axios.post('http://localhost:8080/expense/remove', { id });
            getData();
            setError(null);
        } catch (err) {
            setError('Failed to remove data');
        }
    };

    const updateData = async (requestBody) => {
        try {
            await axios.post('http://localhost:8080/expense/update', requestBody);
            getData();
            setError(null);
        } catch (err) {
            setError('Failed to update data');
        }
    };

    const updateTitle = async (id, title) => {
        let updatedItem = data.find(item => item.id === id);
        updatedItem.title = title;
        updateData(updatedItem);
    };

    const updateAmount = async (id, amount) => {
        let updatedItem = data.find(item => item.id === id);
        updatedItem.amount = parseFloat(amount) || 0;
        updateData(updatedItem);
    };




    const clearAllData = async () => {
        try {
            await axios.post('http://localhost:8080/expense/clear', localStorage.getItem('username'), {
                headers: {
                  "Content-Type": "text/plain",
                },
              });
            getData();
            setError(null);
        } catch (err) {
            setData([]);
            // setError('Failed to clear data');
        }
    };

    const filteredData = data.filter(item =>
        (searchQuery === '' || item.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (searchAmount === '' || item.amount.toString().includes(searchAmount))
    );

    const totalExpense = filteredData.reduce((acc, item) => acc + item.amount, 0);

    const formattedTotalExpense = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(totalExpense);

    // Pie Chart Data
    const chartData = {
        labels: filteredData.map(item => item.title),
        datasets: [
            {
                label: 'Expenses',
                data: filteredData.map(item => item.amount),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF'
                ],
                hoverOffset: 4
            }
        ]
    };

    const lineChartData = {
        labels: filteredData.map(item => item.title),
        datasets: [
            {
                label: 'Expenses Over Time',
                data: filteredData.map(item => item.amount),
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    const barChartData = {
        labels: filteredData.map(item => item.title),
        datasets: [
            {
                label: 'Expenses',
                data: filteredData.map(item => item.amount),
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                borderWidth: 1
            }
        ]
    };

    const doughnutChartData = {
        labels: filteredData.map(item => item.title),
        datasets: [
            {
                label: 'Expenses',
                data: filteredData.map(item => item.amount),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF'
                ],
                hoverOffset: 4
            }
        ]
    };

    // const radarChartData = {
    //     labels: filteredData.map(item => item.title),
    //     datasets: [
    //         {
    //             label: 'Expenses',
    //             data: filteredData.map(item => item.amount),
    //             backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //             borderColor: '#36A2EB',
    //             pointBackgroundColor: '#36A2EB',
    //             pointBorderColor: '#fff',
    //             pointHoverBackgroundColor: '#fff',
    //             pointHoverBorderColor: '#36A2EB'
    //         }
    //     ]
    // };

    const bubbleChartData = {
        datasets: [
            {
                label: 'Expenses Bubble',
                data: filteredData.map((item, index) => ({
                    x: item.amount,
                    y: index + 1,
                    r: item.amount / 5,
                    title: item.title
                })),
                backgroundColor: '#FF6384'
            }
        ]
    };

    const bubbleChartDataOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const dataPoint = context.raw;
                        return `${dataPoint.title}: ${dataPoint.x}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Amount'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Index'
                }
            }
        }
    };



    const scatterChartData = {
        datasets: [
            {
                label: 'Expense Scatter',
                data: filteredData.map((item, index) => ({
                    x: item.amount,
                    y: index + 1,
                    title: item.title
                })),
                backgroundColor: '#36A2EB',
                pointRadius: 6
            }
        ]
    };

    const scatterChartDataOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const dataPoint = context.raw;
                        return `${dataPoint.title}: (${dataPoint.x}, ${dataPoint.y})`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Amount'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Index'
                }
            }
        }
    };



    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Input Fields */}
            <div className="row mb-3">
                <div className="col-md-4 mb-2">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        placeholder="Title"
                    />
                </div>
                <div className="col-md-4 mb-2">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="form-control"
                        placeholder="Amount"
                    />
                </div>
                <div className="col-md-4 mb-2">
                    <button onClick={addData} className="btn btn-outline-primary w-100">
                        Add
                    </button>
                </div>
            </div>

            {/* ✅ Search Functionality */}
            <div className="row mb-3">
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-control"
                        placeholder="Search by title"
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        type="number"
                        value={searchAmount}
                        onChange={(e) => setSearchAmount(e.target.value)}
                        className="form-control"
                        placeholder="Search by amount"
                    />
                </div>
            </div>

            {/* Total Expense and Clear Button */}
            <div className="row mb-3">
                <div className="col">
                    <h3>
                        Total Expense: {formattedTotalExpense} ({filteredData.length})
                        <button
                            onClick={clearAllData}
                            className="btn btn-outline-danger ms-3"
                        >
                            Clear All
                        </button>
                    </h3>
                </div>
            </div>
            <div className="row">
                {/*  Pie Chart */}
                {filteredData.length > 0 && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Pie Chart</h5>
                                <div style={{ width: '100%', height: '300px' }}>
                                    <Pie data={chartData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Line Chart */}
                {filteredData.length > 0 && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Line Chart</h5>
                                <div style={{ width: '100%', height: '300px' }}>
                                    <Line data={lineChartData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bar Chart */}
                {filteredData.length > 0 && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Bar Chart</h5>
                                <div style={{ width: '100%', height: '300px' }}>
                                    <Bar data={barChartData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Doughnut Chart */}
                {/* {filteredData.length > 0 && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Doughnut Chart</h5>
                                <div style={{ width: '100%', height: '300px' }}>
                                    <Doughnut data={doughnutChartData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}

                {/* Radar Chart */}
                {/* {filteredData.length > 0 && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Radar Chart</h5>
                                <div style={{ width: '100%', height: '300px' }}>
                                    <Radar data={radarChartData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}

                {/* Scatter Chart */}
                {filteredData.length > 0 && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Scatter Chart</h5>
                                <div style={{ width: '100%', height: '300px' }}>
                                    <Scatter data={scatterChartData} options={scatterChartDataOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bubble Chart */}
                {/* {filteredData.length > 0 && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Bubble Chart</h5>
                                <div style={{ width: '100%', height: '300px' }}>
                                    <Bubble data={bubbleChartData} options={bubbleChartDataOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}


            </div>

            {/* List of Expenses */}
            {filteredData.map(item => (
                <div key={item.id} className="row mb-2">
                    <div className="col-md-4 mb-2">
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                                updateTitle(item.id, e.target.value)
                                const newData = data.map(d =>
                                    d.id === item.id ? { ...d, title: e.target.value } : d
                                );
                                setData(newData);
                            }}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-4 mb-2">
                        <input
                            type="number"
                            value={item.amount}
                            onChange={(e) => {
                                updateAmount(item.id, e.target.value)
                                // const newData = data.map(d =>
                                //     d.id === item.id ? { ...d, amount: parseFloat(e.target.value) || 0 } : d
                                // );
                                // setData(newData);
                            }}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-4 mb-2">
                        <button
                            onClick={() => removeData(item.id)}
                            className="btn btn-outline-warning"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Expense;
