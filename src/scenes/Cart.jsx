import React from 'react'
import { Table } from 'react-bootstrap'

const Cart = () => {
  return (
    <div className='container'>
      <h1>Cart</h1>
      <Table striped bordered condensed hover variant='dark'>
        <thead>
          <tr>
            <th> Title </th>
            <th> Price </th>
            <th> Quantity </th>
            <th> Total </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Harry Potter</td>
            <td>$10.00</td>
            <td>1</td>
            <td>$10.00</td>
          </tr>
          <tr>
            <td>Lord of the Rings</td>
            <td>$10.00</td>
            <td>1</td>
            <td>$10.00</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Cart