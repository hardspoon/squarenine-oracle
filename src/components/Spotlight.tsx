import React, { FC, ReactNode, Children, isValidElement, cloneElement, useMemo } from 'react';
import clsx from 'clsx';
import '../App.css'; // Assuming App.css contains the .spotlight-highlight class
import { GridFrequencies } from '../types/numerology'; // Import GridFrequencies type

interface SpotlightProps {
  children: ReactNode; // Expecting EnhancedGridDisplay as a child
  gridFrequencies: GridFrequencies; // Frequencies to determine highlighting
}

const Spotlight: FC<SpotlightProps> = ({ children, gridFrequencies }) => {
  // We expect EnhancedGridDisplay as the child.
  // We need to modify its children (the individual GridCells) to apply highlighting.
  // The Tesla grid order is [3,6,9,2,5,8,1,4,7].
  const teslaOrder = [3, 6, 9, 2, 5, 8, 1, 4, 7];
  const teslaHighlightNumbers = [3, 6, 9];

  const childrenWithHighlight = useMemo(() => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }

      // Assume the child is the EnhancedGridDisplay component
      // and it renders its grid cells as children
      const gridChildren = Children.map(child.props.children, (gridCellChild, index) => {
        if (!isValidElement(gridCellChild)) {
          return gridCellChild;
        }
        // Get the number for this cell based on the Tesla order and index
        const cellNumber = teslaOrder[index];
        // Check if this number is one of the Tesla highlight numbers (3, 6, 9)
        // AND if its frequency is greater than 0
        const isHighlighted = teslaHighlightNumbers.includes(cellNumber) && (gridFrequencies[cellNumber] || 0) > 0;

        return cloneElement(gridCellChild, {
          className: clsx(gridCellChild.props.className, { 'spotlight-highlight': isHighlighted }),
        });
      });

      // Return the cloned EnhancedGridDisplay with modified children
      return cloneElement(child, {}, gridChildren);
    }
  });

  return (
    <div>
      {childrenWithHighlight}
    </div>
  );
};

export default Spotlight;