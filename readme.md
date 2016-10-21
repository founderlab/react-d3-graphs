# react-d3-graphs
-------

Charting library using D3 to make charts in React woo

```javascript
import {D3LineGraph} from 'react-d3-graphs'

class SomeComponent extends React.Component {
  render() {
    
    const data = [{date: new Date(), count: 123}, ...]
    const area = true

    return (
      <D3LineGraph data={data} area={area} />
    )
  }
}
```
