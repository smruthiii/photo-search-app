import React, { useState } from 'react'
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap'
import placeholder from './placeholder.png'

import styles from './PhotoViewer.css'

const PhotoViewer = ({ photos }) => {

    const renderPhotos = () => {
        if ( photos ){
        let cards = photos.map(photo => {
            console.log(photo)
            return (
                <Col key={photo.id} xs={4}>
                <Card className={styles.card}>
                    <Card.Img variant='top' src={photo.src.tiny} />
                    <Card.Title>{photo.photographer}</Card.Title>
                    <Card.Link href={photo.src.original} target="_blank">Visit original photo</Card.Link>
                </Card>
                </Col>
            )
        })
        return cards} else {
            let cards = Array(10).fill(0)
            return cards.map( (card,i) => {
                return (<Col key={i} xs={4}>
                    <Card className={styles.card}>
                        <Card.Img variant='top' src={placeholder} />
                        <Card.Title>placeholder</Card.Title>
                    </Card>
                    </Col>)
                
            })
        }
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