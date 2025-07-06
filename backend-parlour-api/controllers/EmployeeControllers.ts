import { Employee } from '../models/EmployeeSchema.js';

// Get all employees
export const getEmployees = async () => {
    const employees = await Employee.find().select('_id name email position salary');
    return employees;
}

// Create a new employee
export const createEmployee = async (employeeData: unknown) => {
    const newEmployee = new Employee(employeeData);
    await newEmployee.save();
    return newEmployee;
};

// Update an employee
export const updateEmployee = async (id: string, employeeData: any) => {
    // console.log('Updating employee with ID:', id, 'Data:', employeeData);
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employeeData, { new: true });
    if (!updatedEmployee) {
        throw new Error('Employee not found');
    }
    return updatedEmployee;
};

// Delete an employee
export const deleteEmployee = async (id: string) => {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
        throw new Error('Employee not found');
    }
    return deletedEmployee;
}