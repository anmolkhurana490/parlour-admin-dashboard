import React, { useState, useEffect, use } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { getData, postData, putData, deleteData } from "@/lib/data"

interface Employee {
  _id: string;
  email: string;
  name: string;
  position: string;
  salary: number;
}

const EmployeeTable = ({ editable }: { editable: boolean }) => {
  const [data, setData] = useState<Employee[]>([])

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const response = await getData('employees');
      if (response) {
        setData(response);
      }
    }

    fetchData()
  }, [])

  const [newRowData, setNewRowData] = useState<Employee | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addNewData = async () => {
    const response = await postData('employees', newRowData);
    if (response) {
      setData([...data, {
        _id: response.employee._id,
        email: newRowData?.email || '',
        name: newRowData?.name || '',
        position: newRowData?.position || '',
        salary: newRowData?.salary || 0
      }]);
      setNewRowData(null);
    }
  };

  const updateRow = async (id: string) => {
    const response = await putData(`employees/${id}`, newRowData);
    if (response) {
      setData(data.map(item => item._id === id ? { ...item, ...newRowData } : item));
      setEditingId(null);
      setNewRowData(null);
    }
  };

  const deleteRow = async (id: string) => {
    const response = await deleteData(`employees/${id}`);
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
        <TableCaption>A List of Employees Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">ID</TableHead>
            <TableHead className="w-[300px]">Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Salary ($)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {data.map((item) =>
            // Check item is not being edited
            item._id !== editingId ? (
              <TableRow key={item._id}>
                <TableCell className="">{item._id}</TableCell>
                <TableCell className="font-medium w-[300px]">{item.email}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.salary}</TableCell>

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
          onClick={() => setNewRowData({ _id: '', email: '', name: '', position: '', salary: 0 })}
        >
          + Add Employee
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
      <TableCell></TableCell>
      <TableCell>
        <input type="text" name="email" placeholder="Email" value={data?.email} onChange={handleChange} className="border p-2" />
      </TableCell>

      <TableCell>
        <input type="text" name="name" placeholder="Name" value={data?.name} onChange={handleChange} className="border p-2" />
      </TableCell>

      <TableCell>
        <input type="text" name="position" placeholder="Position" value={data?.position} onChange={handleChange} className="border p-2" />
      </TableCell >

      <TableCell>
        <input type="number" name="salary" placeholder='Salary ($)' value={data?.salary} onChange={handleChange} className="border p-2" />
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

export default EmployeeTable