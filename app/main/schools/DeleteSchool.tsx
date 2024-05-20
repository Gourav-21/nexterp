import { Button } from '@/components/ui/button';
import { SchoolDataState } from '@/store/main/SchoolData';
import { createClient } from '@/utils/supabase/client';
import React from 'react'
import { useSetRecoilState } from 'recoil';

export default function DeleteSchool({ id }: { id: number }) {
    const setData = useSetRecoilState(SchoolDataState)

    async function deleteSchool(id: number) {
        const supabase = createClient();
        let { error } = await supabase
            .from('school')
            .delete()
            .eq('id', id)
        if (error) {
            console.log(error);
        } else {
            setData((prev) => prev.filter((school) => school.id !== id))
            console.log("school deleted");
        }
    }

    return (
        <div>
            <Button onClick={async () => await deleteSchool(id)}>delete</Button>
        </div>
    )
}
