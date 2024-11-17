import { useEffect, useRef, useState } from 'react';
import { dia, ui, shapes } from '@joint/plus';
import './App.css';

function App() {
    const canvas = useRef<Element | null>(null);
    const [graph, setGraph] = useState<dia.Graph | null>(null);
    const [paper, setPaper] = useState<dia.Paper | null>(null);
    const [counter, setCounter] = useState(1); // Compteur pour gérer la position
    const [className, setClassName] = useState(''); // État pour stocker le nom de la classe

    useEffect(() => {
        // Create a new graph
        const newGraph = new dia.Graph({}, { cellNamespace: shapes });

        // Create a paper and set optionsgit 
        const newPaper = new dia.Paper({
            model: newGraph,
            background: { color: '#F8F9FA' },
            frozen: true,
            async: true,
            cellViewNamespace: shapes,
        });

        // Create a scroller to make the canvas scrollable
        const scroller = new ui.PaperScroller({
            paper: newPaper,
            autoResizePaper: true,
            cursor: 'grab',
            
        });

        // Attach the scroller to the DOM
        canvas.current?.appendChild(scroller.el);
        scroller.render().center();

        // Save references to graph and paper
        setGraph(newGraph);
        setPaper(newPaper);

        newPaper.unfreeze();

        // Clean up resources when the component is unmounted
        return () => {
            scroller.remove();
            newPaper.remove();
        };
    }, []);

    // Fonction pour ajouter une classe
    const addRectangle = () => {
        if (graph && paper && className.trim() !== '') {
            const rect = new shapes.standard.Rectangle();
            rect.position(25 + counter * 10, 25 + counter * 10); // Décalage pour éviter la superposition
            rect.resize(180, 50);
            rect.addTo(graph);
            rect.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });
            rect.attr('label', { text: `Classe ${className}` , fill: '#353535' });
            setCounter(counter + 1); // Incrémente le compteur
            setClassName(''); // Réinitialise l'input
        } else {
            alert('Veuillez entrer un nom valide pour la classe.');
        }
    };

    return (
        <div>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Nom de la classe"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)} // Met à jour l'état
                />
                <button onClick={addRectangle}>Ajouter une Classe</button>
            </div>
            <div className="canvas" ref={canvas} />
        </div>
    );
}

export default App;
