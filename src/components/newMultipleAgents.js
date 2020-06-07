import React from 'react';

import {
    Button,
    FormInput,
    Slider,
    Tooltip
  } from "shards-react";
import {Link} from 'react-router-dom';
import {ContentContainer, ContentRow, SliderContainer} from './newMultipleAgents.styles';

class NewMultipleAgents extends React.Component {
    constructor(props) {
        super(props);
        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.handleXSlider = this.handleXSlider.bind(this);
        this.handleYSlider = this.handleYSlider.bind(this);
        this.state = {
            numAgents: null,
            base_name: null,
            xRange: [25, 75],
            yRange: [0, 100],
            tooltipOpen: false,
        }
    }

    changePropertyValue(property, value) {
        let updatedState = this.state;
        updatedState[property] = value;

        this.setState({
            agent: updatedState,
        })
    }

    toggleTooltip() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        })
    }

    handleXSlider(e) {
        this.setState({
            xRange: [parseInt(e[0]), parseInt(e[1])]
        })
    }

    handleYSlider(e) {
        this.setState({
            yRange: [parseInt(e[0]), parseInt(e[1])]
        })
    }


    render() {
        const {createMultipleAgentsCallback} = this.props;
        const {xRange, yRange, numAgents} = this.state;

        return(
            <ContentContainer>
                <ContentRow>
                    Number of agents:
                    <FormInput
                        style={{maxWidth: '200px', marginLeft:"15px"}}
                        size="sm"
                        onChange={(e) => this.setState({numAgents: e.target.value})}
                        id="numAgentsInput"
                    />
                    <Tooltip
                        open={this.state.tooltipOpen}
                        target="#numAgentsInput"
                        toggle={this.toggleTooltip}
                    >
                        Our system currently supports up to 100 agents.
                    </Tooltip>
                </ContentRow>
                Position:
                <SliderContainer>
                    X range: {JSON.stringify(xRange)}
                    <Slider 
                        connect
                        onSlide={this.handleXSlider}
                        start={xRange}
                        range={{min: 0, max: 100}}
                    />
                </SliderContainer>
                <SliderContainer>
                    Y range: {JSON.stringify(yRange)}
                    <Slider
                        style={{marginLeft: "15px"}}
                        connect
                        onSlide={this.handleYSlider}
                        start={yRange}
                        range={{min: 0, max: 100}}
                    />
                </SliderContainer>
                <Link to="/"><Button style={{float: "right"}} onClick={() => createMultipleAgentsCallback(this.state.agent)}>Create {numAgents} agents</Button></Link>
            </ContentContainer>
        )
    }
}

export default NewMultipleAgents;