"use client"
import { Tables } from '@/types/supabase'
import React, { useEffect, useState } from 'react'
import { useOptimistic } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useRecoilState } from 'recoil'
import { SchoolDataState } from '@/store/main/SchoolData'
import { createClient } from '@/utils/supabase/client'

export default function Table({ schools }: { schools: Tables<'school'>[] }) {
  const [data, setData] = useRecoilState(SchoolDataState)

  useEffect(() => {
    setData(schools)
  }, [schools])

  return (
    <div>
      <DataTable data={data} columns={columns} />

    </div>
  )
}
