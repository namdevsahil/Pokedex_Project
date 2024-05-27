import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import './Pokemon.css';

function Pokemon({ id, name, image }) { // Added id parameter
    return (
        <div className='pokemon'>
            <Link to={`/pokemon/${id}`}> {/* Fixed Link to include id */}
                <div className='pokemon-name'>{name}</div>
                <div>
                    <img className='pokemon-image' src={image} alt={name} /> {/* Added alt attribute */}
                </div>
            </Link>
        </div>
    );
}

export default Pokemon;
