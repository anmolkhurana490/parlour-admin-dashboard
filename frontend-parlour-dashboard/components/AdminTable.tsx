import React, { useState, useEffect, use } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { getData, postData, putData, deleteData } from "@/lib/data"

interface Admin {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

const AdminTable = ({ editable }: { editable: boolean }) => {
    const [data, setData] = useState<Admin[]>([])

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            const response = await getData('admins');
            if (response) {
                setData(response);
            }
        }

        fetchData()
    }, [])

    const [newRowData, setNewRowData] = useState<Admin | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    const addNewData = async () => {
        const response = await postData('admins', newRowData);
        if (response) {
            setData([...data, {
                _id: response.admin._id,
                name: newRowData?.name || '',
                email: newRowData?.email || '',
                password: newRowData?.password || '',
                role: newRowData?.role || 'Admin' // Default to 'Admin' if not
            }]);
            setNewRowData(null);
        }
    };

    const updateRow = async (id: string) => {
        const response = await putData(`admins/${id}`, newRowData);
        if (response) {
            setData(data.map(item => item._id === id ? { ...item, ...newRowData } : item));
            setEditingId(null);
            setNewRowData(null);
        }
    };

    const deleteRow = async (id: string) => {
        const response = await deleteData(`admins/${id}`);
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
                <TableCaption>A List of Admin Data</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="w-[300px]">Email</TableHead>
                        <TableHead>Password</TableHead>
                        <TableHead className="">Role</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {data.map((item) =>
                        // Check item is not being edited
                        item._id !== editingId ? (
                            <TableRow key={item._id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="font-medium w-[300px]">{item.email}</TableCell>
                                <TableCell>{/*item.password*/} *******</TableCell>
                                <TableCell className="">{item.role}</TableCell>

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
                    )}

                    {/* logic to add new row */}
                    {editable && !editingId && newRowData && (
                        <InputRowComp data={newRowData} setData={setNewRowData} handleSubmit={() => addNewData()} handleCancel={cancelInput} />
                    )}

                </TableBody>
            </Table>

            {editable && !editingId && !newRowData && (
                <button
                    className="bg-green-500 text-white mt-1 px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => setNewRowData({ _id: '', name: '', email: '', password: '', role: 'SuperAdmin' })}
                >
                    + Add Admin
                </button>
            )}
        </>
    )
}

const InputRowComp = ({ data, setData, handleSubmit, handleCancel }: any) => {
    const handleChange = (e: any) => {
        const { name, type, value, checked } = e.target;
        setData({
            ...data,
            [name]: name === 'role' ? (checked ? 'SuperAdmin' : 'Admin') : value,
        });
    };

    return (
        <TableRow>
            <TableCell>
                <input type="text" name="name" placeholder="Name" value={data?.name} onChange={handleChange} className="border p-2" />
            </TableCell>

            <TableCell>
                <input type="text" name="email" placeholder="Email" value={data?.email} onChange={handleChange} className="border p-2" />
            </TableCell>

            <TableCell>
                <input type="text" name="password" placeholder="Password" value={data?.password} onChange={handleChange} className="border p-2" />
            </TableCell >

            <TableCell>
                <input type='checkbox' name="role" checked={data?.role === 'SuperAdmin'} onChange={handleChange} className="border p-2" />
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

export default AdminTable