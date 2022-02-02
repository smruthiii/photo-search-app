import React, { useState } from 'react'
import { Form,Button,Row,Col } from 'react-bootstrap'

import styles from './Search.css'

const Search = ({ updateSearchString }) => {
    const [searchText, setSearchText] = useState('')

    

    
    return (
        <Form className='w-50 mb-3'>
            <Row>
                <Col xs={8}>
                    <Form.Control placeholder="Search" value={searchText} onChange={e => setSearchText(e.target.value)}></Form.Control>
                    </Col>
                    <Col xs={4}>
                    <Button type="submit" onClick={(e) => {
                        //prevent automatic reload on form submission 
                        e.preventDefault()
                        updateSearchString(searchText)
                        }}>Submit</Button></Col>
            </Row>
            
        </Form>
        
    )
}

export default Search