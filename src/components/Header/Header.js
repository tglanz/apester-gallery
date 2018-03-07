import React from 'react';

import './Header.css';

import apesterLogo from './apester-logo.svg';
import Blobs from '../Blobs/Blobs';

export default () => <div className="Header">
    <h1 className="header">Apester Gallery</h1>
    <div className="blobs-container">
        <Blobs imageSrc={apesterLogo} />
    </div>
</div>