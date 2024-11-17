import { useEffect, useRef } from 'react';
import { dia, ui, shapes } from '@joint/plus';
import './App.css';

function App() {
    const canvas = useRef<Element | null>(null);

    useEffect(() => {
        // Create a new graph
        const graph = new dia.Graph({}, { cellNamespace: shapes });

        // Create a paper and set options
        const paper = new dia.Paper({
            model: graph,
            background: { color: '#F8F9FA' },
            frozen: true,
            async: true,
            cellViewNamespace: shapes,
        });

        // Create a scroller to make the canvas scrollable
        const scroller = new ui.PaperScroller({
            paper,
            autoResizePaper: true,
            cursor: 'grab',
        });

        // Attach the scroller to the DOM
        canvas.current?.appendChild(scroller.el);
        scroller.render().center();

        // Create a sample rectangle shape and add it to the graph
        const rect = new shapes.standard.Rectangle();
        rect.position(25, 25);
        rect.resize(180, 50);
        rect.addTo(graph);
        graph.addCell(rect);
        paper.unfreeze();
        rect.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });
        rect.attr('label', { text: 'Hello', fill: '#353535' });
        
        const rect2 = new shapes.standard.Rectangle();
        rect2.position(50, 25);
        rect2.resize(180, 50);
        rect2.addTo(graph);
        graph.addCell(rect);
        paper.unfreeze();
        rect2.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });
        rect2.attr('label', { text: 'Hi', fill: '#353535' });




        
        // Clean up resources when the component is unmounted
        return () => {
            scroller.remove();
            paper.remove();
        };
    }, []);

    return (
       
          
              <div className="canvas" ref={canvas} />
        
    );
}

export default App;
