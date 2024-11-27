import React, { useState } from 'react'; 
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'; 
 
const Menu = (props) => { 
    const [selectedDish, setSelectedDish] = useState(null); 
 
    const onDishSelect = (dish) => { 
        setSelectedDish(dish); 
    }; 
 
    const renderDish = (dish) => { 
        if (dish != null) { 
            return ( 
                <Card> 
                    <CardImg top src={dish.image} alt={dish.name} /> 
                    <CardBody> 
                        <CardTitle>{dish.name}</CardTitle> 
                        <CardText>{dish.description}</CardText> 
                    </CardBody> 
                </Card> 
            ); 
        } else { 
            return <div></div>; 
        } 
    }; 
 
    const menu = props.dishes.map((dish) => { 
        return ( 
            <div className="col-12 col-md-5 m-1" key={dish.id}> 
                <Card onClick={() => onDishSelect(dish)}> 
                    <CardImg width="100%" src={dish.image} alt={dish.name} /> 
                    <CardImgOverlay> 
                        <CardTitle>{dish.name}</CardTitle> 
                    </CardImgOverlay> 
                </Card> 
            </div> 
        ); 
    }); 
 
    return ( 
        <div className="container"> 
            <div className="row"> 
                {menu} 
            </div> 
            <div className="row"> 
                <div className="col-12 col-md-5 m-1"> 
                    {renderDish(selectedDish)} 
                </div> 
            </div> 
        </div> 
    ); 
}; 
 
export default Menu;
