import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify';

import LinkForm from './LinkForm';

import {db} from '../firebase';

export const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === '') {
                await db.collection('links').doc().set(linkObject);
                toast('New link added',{
                    type: 'success'
                });
            } else {
                await db.collection('links').doc(currentId).update(linkObject);
                toast('Link updated successfully',{
                    type: 'info'
                });
                setCurrentId('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onDeleteLink = async (id) => {
        if (window.confirm('Are you sure you want to delete this link?')) {
            await db.collection('links').doc(id).delete();
            toast('Link deleted successfully',{
                type: 'error',
                autoClose: 2000,
            });
        }
    };

    const getLinks = async () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            });
            setLinks(docs);
        });
    };

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <div className="col-12">
            <div className="col-12 p-2">
                <LinkForm {...{addOrEditLink, currentId, links}}/>   
            </div>
            <div className="col-12 p-2">
                {links.map(link => {
                    return <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                    <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank">
                                Go to Website
                            </a>
                        </div>
                    </div>
                })}
            </div>
        </div> 
    )
}

export default Links;