import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { getData, postData, putData, deleteData } from "@/lib/data"

interface Task {
    _id: string;
    title: string;
    description: string;
    assignedTo: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'completed';
}

const TaskTable = ({ editable }: { editable: boolean }) => {
    const [data, setData] = useState<Task[]>([])

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            const response = await getData('tasks');
            if (response) {
                setData(response);
            }
        }

        fetchData()
    }, [])


    const [newRowData, setNewRowData] = useState<Task | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    const addNewData = async () => {
        const response = await postData('tasks', newRowData);
        if (response) {
            setData([...data, {
                _id: response.task._id,
                title: newRowData?.title || '',
                description: newRowData?.description || '',
                assignedTo: newRowData?.assignedTo || '',
                dueDate: newRowData?.dueDate || new Date().toISOString(),
                status: newRowData?.status || 'pending'
            }]);
            setNewRowData(null);
        }
    };

    const updateRow = async (id: string) => {
        const response = await putData(`tasks/${id}`, newRowData);
        if (response) {
            setData(data.map(item => item._id === id ? { ...item, ...newRowData } : item));
            setEditingId(null);
            setNewRowData(null);
        }
    };

    const deleteRow = async (id: string) => {
        const response = await deleteData(`tasks/${id}`);
        if (response) {
            setData(data.filter(item => item._id !== id));
            if (editingId === id) {
                setEditingId(null);
                setNewRowData(null);
            }
        }
    }

    const cancelInput = () => {
        setNewRowData(null);
        setEditingId(null);
    }

    return (
        <>
            <Table>
                <TableCaption>A list of Tasks</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Assigned To (Employee Id)</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {data.map((item) => (
                        // Check item is not being edited
                        item._id !== editingId ? (
                            <TableRow key={item._id}>
                                <TableCell className="font-medium">{item.title}</TableCell>
                                <TableCell className="max-w-[250px] line-clamp-1">{item.description}</TableCell>
                                <TableCell>{item.assignedTo}</TableCell>
                                <TableCell>{new Date(item.dueDate).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                {editable && (
                                    <TableCell className="flex gap-2 justify-end">
                                        <button onClick={() => { setEditingId(item._id); setNewRowData(item) }} className="text-blue-500 hover:underline">Edit</button>
                                        <button className="text-red-500 hover:underline ml-2" onClick={() => deleteRow(item._id)}>Delete</button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ) : (
                            // If item is being edited, render InputRowComp
                            <InputRowComp key={item._id} data={newRowData} setData={setNewRowData} handleSubmit={() => updateRow(item._id)} handleCancel={cancelInput} />
                        )
                    ))}

                    {/* logic to add new row */}
                    {editable && !editingId && newRowData && (
                        <InputRowComp data={newRowData} setData={setNewRowData} handleSubmit={() => addNewData()} handleCancel={cancelInput} />
                    )}

                </TableBody>
            </Table>

            {editable && !editingId && !newRowData && (
                <button
                    className="bg-green-500 text-white mt-1 px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => setNewRowData({ _id: '', title: '', description: '', assignedTo: '', dueDate: new Date().toLocaleDateString(), status: 'pending' })}
                >
                    + Add Task
                </button>
            )}
        </>
    )
}

const InputRowComp = ({ data, setData, handleSubmit, handleCancel }: any) => {
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData({
            ...data, [name]: value,
        });
    };

    return (
        <TableRow>
            <TableCell>
                <input type="text" name="title" placeholder="Title" value={data?.title} onChange={handleChange} className="border p-2" />
            </TableCell>

            <TableCell>
                <input type="text" name="description" placeholder="Description" value={data?.description} onChange={handleChange} className="border p-2" />
            </TableCell>

            <TableCell>
                <input type="text" name="assignedTo" placeholder="Employee ID" value={data?.assignedTo} onChange={handleChange} className="border p-2" />
            </TableCell >

            <TableCell>
                <input type="date" name="dueDate" value={new Date(data?.dueDate).toISOString().slice(0, 10)} onChange={handleChange} className="border p-2" />
            </TableCell>

            <TableCell>
                <select name="status" value={data?.status} onChange={handleChange} className="border p-2" >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </TableCell>

            <TableCell className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
                <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white ml-2 px-4 py-2 rounded hover:bg-red-600"
                >
                    Cancel
                </button>
            </TableCell>
        </TableRow>
    )
}


export default TaskTable