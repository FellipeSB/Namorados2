/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MugFrontOption {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export type VersoType = 'foto' | 'spotify' | 'calendario' | 'nome';

export interface MugBackOption {
  id: VersoType;
  name: string;
  description: string;
  image: string;
}

export interface MugModelOption {
  id: string;
  name: string;
  price: number;
  category: 'branca' | 'colorida' | 'coracao' | 'colher';
  image: string;
}

export interface PackagingOption {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface OrderState {
  frontId: string;
  backType: VersoType;
  backData: {
    coupleNames?: string;
    anniversaryDate?: string;
    songName?: string;
  };
  mugModelId: string;
  packagingId: string;
}
