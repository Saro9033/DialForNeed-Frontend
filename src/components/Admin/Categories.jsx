import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesData, ClearCategoryError, ClearIsCreated, ClearIsDeleted, ClearIsUpdated, IsCreated, IsDeleted, IsUpdated, categoryError, categoryStatus, createCategory, deleteCategory, fetchCategory, updateCategory } from '../../slices/CategorySlice';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MDBDataTable } from 'mdbreact';
import { IoIosAddCircle } from "react-icons/io";
import { useSnackbar } from 'notistack';
import { Row, Col, Button } from 'react-bootstrap';

const Categories = () => {
    const categories = useSelector(CategoriesData);
    const status = useSelector(categoryStatus);
    const error = useSelector(categoryError);
    const isCreated = useSelector(IsCreated);
    const isUpdated = useSelector(IsUpdated);
    const isDeleted = useSelector(IsDeleted);

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [newCategory, setNewCategory] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null); 
    const [updateValue, setUpdateValue] = useState('')

    // Effect to handle category creation status and errors
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(ClearCategoryError());
        }

        if (isCreated) {
            enqueueSnackbar("Category Added", { variant: 'success' });
            dispatch(ClearIsCreated());
            dispatch(fetchCategory());
        }

        if (isUpdated) {
            enqueueSnackbar("Category Updated", { variant: 'success' });
            dispatch(ClearIsUpdated()); // Make sure to clear the isUpdated flag
            dispatch(fetchCategory());
        }

        if (isDeleted) {
            enqueueSnackbar("Category Deleted", { variant: 'success' });
            dispatch(ClearIsDeleted()); // Make sure to clear the isUpdated flag
            dispatch(fetchCategory());
        }

        dispatch(fetchCategory());

    }, [dispatch, error, enqueueSnackbar, isCreated, isUpdated, isDeleted]);

    const handleCategoryAdd = (e) => {
        e.preventDefault();
        if (newCategory.trim() !== '') {
            dispatch(createCategory(newCategory.trim()));
            setNewCategory('');
        }
    };

    const handleEdit = (categoryId) => {
        setEditingCategoryId(categoryId); 
        const Value = categories.find(cat => cat._id === categoryId)?.title;
        setUpdateValue(Value)
    };

    const handleUpdate = (categoryId) => {
        console.log(updateValue)
            dispatch(updateCategory({ id: categoryId, title: updateValue }));
            setEditingCategoryId(null); // Exit edit mode after update
    };

    // const handleInputChange = (e, categoryId) => {
    //     // Update local state with the new category name
    //     const updatedValue = e.target.value;
    //     const updatedCategories = categories.map(cat =>
    //         cat._id === categoryId ? { ...cat, updatedTitle: updatedValue } : cat
    //     );
    //     // No need to dispatch an action here if using local state for input value
    // };

    const handleDelete =(id) =>{
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(deleteCategory(id));
        }
    }

    const setCategories = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', sort: 'asc' },
                { label: 'Categories', field: 'name', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' },
            ],
            rows: [],
        };

        categories.forEach((cat) => {
            data.rows.push({
                id: cat._id,
                name: editingCategoryId === cat._id ? (
                    <input
                        type="text"
                        value={updateValue} // Bind to updatedTitle when editing
                        onChange={(e) => setUpdateValue(e.target.value)}
                        className="form-control"
                    />
                ) : (
                    cat.title
                ),
                actions: (
                    editingCategoryId === cat._id ? (
                        <button
                            onClick={() => handleUpdate(cat._id)}
                            className="btn btn-primary"
                        >
                            Update
                        </button>
                    ) : (
                       <> 
                       <button  onClick={() => handleEdit(cat._id)} className="btn btn-primary"> <FaEdit />  </button>
                        <button onClick={() => handleDelete(cat._id)} className='btn btn-danger py-1 px-2 ml-2'><FaTrashAlt /></button>
                        </> 
                    )
                ),
            });
        });

        return data;
    };

    return (
        <div>
            {status === 'loading' ? (
                <div className="d-flex align-items-start justify-content-center">
                    <div className="loader"></div>
                </div>
            ) : status === 'succeeded' && categories.length === 0 ? (
             <>   <h1>No Categories Placed</h1>
               <Row className='w-100 mb-3'>
                        <Col xs={10} sm={10} md={10} lg={10}>
                            <input className='form-control' type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                            <Button type="button" variant="primary" onClick={handleCategoryAdd}>
                                {window.innerWidth < 800 ? '' : 'ADD '}
                                <IoIosAddCircle fontSize='1.5rem' />
                            </Button>
                        </Col>
                    </Row>
                 </> 
            ) : (
                <>
                    <Row className="mt-4">
                        <Col>
                            <h2>All Categories</h2>
                        </Col>
                    </Row>
                    <Row className='w-100 mb-3'>
                        <Col xs={10} sm={10} md={10} lg={10}>
                            <input className='form-control' type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                            <Button type="button" variant="primary" onClick={handleCategoryAdd}>
                                {window.innerWidth < 800 ? '' : 'ADD '}
                                <IoIosAddCircle fontSize='1.5rem' />
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="table-responsive">
                                <MDBDataTable
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                    searching={false}
                                    responsive
                                    data={setCategories()}
                                />
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default Categories;
