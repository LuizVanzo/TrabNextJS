'use client'

import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function CampoEntradaFloating(props) {

    return (
        <div className="form-group">
            <FloatingLabel controlId={props.id} label={props.label}>
                <Form.Control
                    type={props.tipo}
                    name={props.name}
                    defaultValue={props.value}
                    readOnly={props.readOnly}
                    required={props.required}
                />
            </FloatingLabel>
            <br />
        </div>
    );
}
    