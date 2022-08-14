import React from "react";
import { useEffect } from "react";
import { useState, useRef} from "react";
import "./Sorting.css"
import { mergeSort } from "./SortingAlgorithms/MergeSort";
import { insertionSort } from "./SortingAlgorithms/InsertionSort";
import { bubbleSort } from "./SortingAlgorithms/BubbleSort";
import { quickSort } from "./SortingAlgorithms/QuickSort";
import { heapSort } from "./SortingAlgorithms/HeapSort";

const SortingVisualizer = () => {
    const [arr, setArr] = useState([]);
    const [usrArr, setUsrArr] = useState("");
    const [isSorting, setIsSorting] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const windowWidth = window.innerWidth;
    var len = 40;
    const containerRef = useRef(null);
    if(windowWidth < 500) {
        len = 15;
    }
    useEffect(() => {arrController()}, []);

    const arrController = () => {
        if (isSorting) {
            return;
        }
        if(isSorted) {
            resetAnimation();
        }
        setIsSorted(false);
        const newArr = [];
        for (let index = 0; index < len; index++) {
            newArr.push(Math.floor(Math.random() * 74) + 1);
        }
        setArr(newArr);
    }

    const setUsrInput = () => {
        console.log(usrArr);
        let newArr = usrArr.split(",");
        let tmp = newArr.map(str => {
            return Number(str);
          });
        console.log(newArr);
        console.log(tmp);
        setArr(tmp);
        resetAnimation();
    }

    const doMergeSort = () => {
        if(isSorting) {
            return
        }
        const animations = mergeSort(arr);
        animateArray(animations);
    }

    const doInsertionSort = () => {
        if(isSorting) {
            return;
        }
        const animations = insertionSort(arr);
        animateArray(animations);
    }

    const doBubbleSort = () => {
        if(isSorting) {
            return;
        }
        const animations = bubbleSort(arr);
        animateArray(animations);
    }

    const doQuickSort = () => {
        if(isSorting) {
            return;
        }
        const animations = quickSort(arr);
        animateArray(animations);
    }

    const doHeapSort = () => {
        if(isSorting) {
            return;
        }
        const animations = heapSort(arr);
        animateArray(animations);
    }

    /**
     * Thanks to this github repo for helping understand the animation proeccess.
     *  https://github.com/lexesjan/react-sort-visualizer/
     * 
     */
    const animateArray = (animations) => {
        if(isSorting) {
            return;
        }
        setIsSorting(true);
        animations.forEach(([values, swapped], idx) => {
            setTimeout(() => {
                if(!swapped) {
                    //update color
                    if (values.length === 2) {
                        const [i, j] = values;
                        accessAnimation(i);
                        accessAnimation(j);
                    } else {
                        const [i] = values;
                        accessAnimation(i);
                    }  
                } else {
                    setArr((cur) => {
                        //update height
                        try {
                            const [idx, value] = values;
                            const newArray = [...cur];
                            newArray[idx] = value;
                            return newArray;
                        } catch (error) {
                            console.log(values);
                        }
                    })
                }
            }, idx * 15);
        });
        setTimeout(() => {
            setIsSorted(true);
            setIsSorting(false);
        }, animations.length * 15);
    }

    const accessAnimation = (idx) => {
        const bars = containerRef.current.children;
        const barStyles = bars[idx].style;
        setTimeout(() => {
            barStyles.backgroundColor = "green"
        }, 20);
    };

    const resetAnimation = () => {
        const bars = containerRef.current.children;
        for (let i = 0; i < arr.length; i++) {
            const style = bars[i].style;
            style.backgroundColor = '#657383';
        }
    }
    

    return(
        <div>
            <div
                className="BarContainer"
                ref={containerRef}>
                    {arr.map((height, idx) => 
                                            <div
                                            className="Bar"
                                            style={{height: height+"vh",
                                                    backgroundColor: "#657383"}}
                                                    key={idx}>{height}</div>)}
            </div>
            <hr/>
            <div className="controllerContainer">
                <h1 className="title">Sorting Visualizer In React</h1>
                <div>
                    <button
                        onClick={() => {arrController()}}>Randomize Array
                    </button>
                    <button
                        onClick={() => {doMergeSort()}}>Merge Sort
                    </button>
                    <button
                        onClick={() => {doInsertionSort()}}>Insertion Sort
                    </button>
                    <button
                        onClick={() => {doBubbleSort()}}>Bubble Sort
                    </button>
                    <button
                        onClick={() => {doQuickSort()}}>Quick Sort
                    </button>
                    <button
                        onClick={() => {doHeapSort()}}>Heap Sort
                    </button>
                </div>
            </div>
            <div>
                <span>Example Input: 3, 45, 26, 4, 2</span>
                <input
                    placeholder={"Input your own numbers."}
                    onChange={(e) => {setUsrArr(e.target.value)}}
                    onKeyPress={(event) => {
                    if (!/[0-9, ,]/.test(event.key)) {
                        event.preventDefault();
                    }
                    }}
                    
                />
                <button
                    onClick={() => {setUsrInput()}}>Submit Input
                
                </button>
            </div>
        </div>
    );
};

export default SortingVisualizer;