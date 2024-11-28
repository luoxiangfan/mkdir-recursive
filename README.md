# mkdir-recursive
Recursively creates a directory. Returns undefined or the first directory path created.

## Installation

```js
npm @lxf2513/mkdir-recursive
```

## Usage

```js
// sync
import { mkdirSyncRecursive } from '@lxf2513/mkdir-recursive'

const path = mkdirSyncRecursive('/path/source')

const paths = mkdirSyncRecursive(['test', 'build/scripts', 'test/html'])

// async
import { mkdirAsyncRecursive } from '@lxf2513/mkdir-recursive'

const path = await mkdirAsyncRecursive('/path/source')
```