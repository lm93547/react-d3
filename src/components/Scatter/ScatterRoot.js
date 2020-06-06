import React, { useMemo, useState } from 'react'
import Faker from "faker";
import { range } from "d3-array";
import Scatterplot from "./Scatterplot";
import { scaleOrdinal } from "d3-scale";
import { useTooltip, tooltipContext } from "./useTooltip";
import { Grid } from '@material-ui/core';

const ScatterRoot = () => {
    const data = useMemo(
        () =>
          range(100).map(i => ({
            id: i,
            number1: Math.random(),
            number2: Math.random(),
            name: Faker.company.companyName(),
            domainName: Faker.internet.domainName(),
            ip: Faker.internet.ip(),
            state: Faker.address.state(),
            color: Faker.internet.color()
          })),
        []
    );

      // bucketize states into 50 buckets
  const stateToNumber = scaleOrdinal()
  .domain(data.map(d => d.state))
  .range(range(50));

// alphabetize letters into 25 buckets
const alphabet = scaleOrdinal()
  .domain("abcdefghijklmnoprstuvwxyz".split(""))
  .range(range(25));

const state = useTooltip();

    console.log(data)

    return (
        <Grid container justify="center">
            <Grid item>
                <h3>D3 random scatter and synchronised tooltip</h3>
            </Grid>
            <tooltipContext.Provider value={state}>
        <svg width="1000" height="1000">
          <Scatterplot
            x={0}
            y={0}
            width={400}
            height={400}
            data={data}
            xDimension={d => d.number1}
            yDimension={d => d.number2}
          />

          <Scatterplot
            x={450}
            y={0}
            width={400}
            height={400}
            data={data}
            xDimension={d => d.number1}
            yDimension={d => stateToNumber(d.state)}
          />

          <Scatterplot
            x={0}
            y={450}
            width={400}
            height={400}
            data={data}
            xDimension={d => stateToNumber(d.state)}
            yDimension={d => alphabet(d.name[0])}
          />
        </svg>
      </tooltipContext.Provider>
        </Grid>
    )
}

export {ScatterRoot}
