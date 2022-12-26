# Building Editor 2d

Simple 2D CAD wrapped in p5js.  
It implements command input, layers, and classes for handling shapes, just like CAD software.

The main processing as CAD is in the `/src` directory.
Other directories are Next.js related files.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CAD Usage

https://user-images.githubusercontent.com/23289252/209470343-e5917129-d843-439b-a71f-f81eed050bd4.mov

## Feature

- CAD UI Feature
  - Select Geometry
  - Delete Geometry
  - Add rectangle
  - Zoom Extend All
  - Snap
    - End point
    - Middle
    - Near
    - Grid
    - Angle
  - scale bar
  - Layer
    - Visible
    - Lock
    - Layer color select
    - Active
    - Add & Delete
  - Pan
  - Zoom
- Geometry
  - Line
  - Point
  - Polyline
  - Rectangle
  - Vector
