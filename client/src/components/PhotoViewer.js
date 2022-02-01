import React, { useState } from 'react'
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap'

import { styles } from './PhotoViewer'

const PhotoViewer = ({ photos }) => {

    const renderPhotos = () => {
        let cards = photos.map(photo => {
            return (
                <Col key={photo.id} xs={4}>
                <Card>
                    <Card.Img variant='top' src={photo.src.tiny} />
                    <Card.Title>{photo.photographer}</Card.Title>
                </Card>
                </Col>
            )
        })
        return cards
    }
    return (
        <Container>
        <Row>
        {renderPhotos()}
        </Row>
        
        </Container>
        
    )
}

export default PhotoViewer